#![feature(proc_macro_hygiene, decl_macro)]

extern crate diesel;
#[macro_use]
extern crate diesel_migrations;
#[macro_use]
extern crate rocket;
extern crate serde;

use rocket::Rocket;
use rocket_contrib::json::Json;
use serde_json::{json, Value};
use std::collections::HashMap;

use quote::api;
use quote::data;
use quote::http::error::HttpError;
use quote::http::db::Database;
use quote::http::session::Session;
use quote::serial::{
    Permission,
    QuoteFile,
    SessionCreateRequest,
    SessionCreateResponse,
    UserCreateRequest,
    UserCreateResponse,
    QuoteFileCreateRequest,
    QuoteFileCreateResponse,
    QuoteFileListResponse,
};

#[get("/")]
fn index() -> Json<Value> {
    Json(json!({
        "service": "quote".to_string(),
        "version": quote::version::version(),
    }))
}

#[post("/session", data = "<request>")]
fn session_create(db: Database, request: Json<SessionCreateRequest>) -> Result<Json<SessionCreateResponse>, HttpError> {
    let token = api::session::create(&*db, &request.email, &request.password)?;
    Ok(Json(SessionCreateResponse { token: token.as_string() }))
}


#[post("/user", data = "<request>")]
fn user_create(db: Database, request: Json<UserCreateRequest>) -> Result<Json<UserCreateResponse>, HttpError> {
    api::user::create(&*db, &request.email, &request.password)?;
    Ok(Json(UserCreateResponse { email: request.email.clone() }))
}

#[post("/quotes", data = "<request>")]
fn file_create(db: Database, session: Session, request: Json<QuoteFileCreateRequest>) -> Result<Json<QuoteFileCreateResponse>, HttpError> {
    let file = api::quote::create_file(&*db, &request.name)?;
    api::quote::share_file(&*db, &file, &session.user.key, &data::Permission::Manage)?;
    Ok(Json(QuoteFileCreateResponse { file: QuoteFile { id: file.to_i64(), name: request.name.clone(), access: Permission::Manage } }))
}

#[get("/quotes")]
fn file_list(db: Database, session: Session) -> Result<Json<QuoteFileListResponse>, HttpError> {
    let files = api::quote::list_files(&*db, &session.user.key)?;
    Ok(Json(QuoteFileListResponse { files: files.into_iter().map(Into::into).collect() }))
}

#[catch(404)]
fn not_found() -> HttpError {
    HttpError::NotFound
}

diesel_migrations::embed_migrations!("migrations");

fn rocket(env: rocket::config::Environment, url: &str, pool_size: Option<i64>) -> Rocket {
    let mut database_config = HashMap::new();
    let mut databases = HashMap::new();
    database_config.insert("url", rocket::config::Value::from(url));
    if let Some(pool_size) = pool_size {
        database_config.insert("pool_size", rocket::config::Value::from(pool_size));
    }
    databases.insert("quote_db", rocket::config::Value::from(database_config));
    let config = rocket::Config::build(env)
        .extra("databases", databases)
        .finalize()
        .unwrap();
    let routes = routes![
        index,
        session_create,
        user_create,
        file_create,
    ];
    rocket::custom(config)
        .mount("/", routes)
        .register(catchers![not_found])
        .attach(Database::fairing())
}

fn main() {
    let url = std::env::var("DATABASE_URL").expect("Must specify database url.");
    let r = rocket(rocket::config::Environment::Production, &url, None);
    let connection = Database::get_one(&r)
        .expect("Expected database connection to be available.");
    embedded_migrations::run_with_output(&*connection, &mut std::io::stdout())
        .expect("Migrations have not been successful.");
    r.launch();
}


#[cfg(test)]
mod test {
    use super::rocket;
    use diesel::prelude::*;
    use rocket::local::{Client, LocalResponse};
    use rocket::http::{Status, Header, ContentType, Accept};
    use serde_json;
    use serde_json::json;

    use quote::api;
    use quote::serial::{
        Permission,
        QuoteFileCreateRequest,
        QuoteFileCreateResponse,
    };

    static PASSWORD: &str = "12345678";
    static CRYPTED: &str = "$rscrypt$0$DggB$N2QXvv2BlUM7zl6A0+egOg==$NXGrxAIcOP0FgtcmZx5T9p8HUftBkkQHVSNu9WN5XLY=$";

    fn url() -> String {
        std::env::var("TEST_DATABASE_URL")
            .unwrap_or("postgres://quote_test:quote_test@localhost/quote_test".to_string())
    }

    fn connection() -> diesel::PgConnection {
        diesel::PgConnection::establish(&url())
            .expect("Could not establish test database connection")
    }

    fn seed() -> String {
        let db = connection();
        // Ignore whether this succeeds, will work the first time, don't care after that.
        let _ = api::user::create_crypted(&db, "http-test@example.com", CRYPTED);
        api::session::create(&db, "http-test@example.com", PASSWORD).expect("Session creation.").to_string()
    }

    fn client() -> Client {
        let r = rocket(rocket::config::Environment::Development, &url(), Some(2));
        Client::new(r).expect("valid rocket instance")
    }

    fn parse_response<A: serde::de::DeserializeOwned>(response: &mut LocalResponse) -> A {
        let body = response.body_string().expect("Response should have body.");
        serde_json::from_str(&body).expect("Response should parse")
    }

    #[test]
    fn index() {
        let client = client();
        let mut response = client.get("/").dispatch();
        assert_eq!(response.status(), Status::Ok);
        let actual = parse_response::<serde_json::Value>(&mut response);
        assert_eq!(actual, json!({
            "service": "quote",
            "version": quote::version::version(),
        }));
    }

    #[test]
    fn file_create() {
        let client = client();
        let token = seed();
        let mut response = client.post("/quotes")
            .header(ContentType::JSON)
            .header(Accept::JSON)
            .header(Header::new("Authorization", token))
            .body(serde_json::to_string(&QuoteFileCreateRequest {
                name: "Test file".to_string(),
            }).expect("Serialisation."))
            .dispatch();
        assert_eq!(response.status(), Status::Ok);
        let actual = parse_response::<QuoteFileCreateResponse>(&mut response);
        assert_eq!(actual.file.name, "Test file");
        assert_eq!(actual.file.access, Permission::Manage);
    }
}
