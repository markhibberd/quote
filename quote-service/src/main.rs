#![feature(proc_macro_hygiene, decl_macro)]

extern crate diesel;
#[macro_use]
extern crate diesel_migrations;
#[macro_use]
extern crate rocket;
extern crate serde;

use rocket_contrib::json::Json;
use serde_json::{json, Value};
use std::collections::HashMap;

use quote::api;
use quote::data::Permission;
use quote::http::error::HttpError;
use quote::http::db::Database;
use quote::http::session::Session;
use quote::serial::{
    SessionCreateRequest,
    SessionCreateResponse,
    UserCreateRequest,
    UserCreateResponse,
    QuoteFileCreateRequest,
    QuoteFileCreateResponse,
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
    Ok(Json(SessionCreateResponse { token: token.to_string() }))
}


#[post("/user", data = "<request>")]
fn user_create(db: Database, request: Json<UserCreateRequest>) -> Result<Json<UserCreateResponse>, HttpError> {
    api::user::create(&*db, &request.email, &request.password)?;
    Ok(Json(UserCreateResponse { email: request.email.clone() }))
}

#[post("/quotes", data = "<request>")]
fn file_create(db: Database, session: Session, request: Json<QuoteFileCreateRequest>) -> Result<Json<QuoteFileCreateResponse>, HttpError> {
    let file = api::quote::create_file(&*db, &request.name)?;
    api::quote::share_file(&*db, &file, &session.user.key, &Permission::Manage)?;
    Ok(Json(QuoteFileCreateResponse { id: file.to_i64(), name: request.name.clone() }))
}

#[catch(404)]
fn not_found() -> HttpError {
    HttpError::NotFound
}

diesel_migrations::embed_migrations!("migrations");

fn main() {
    let url = std::env::var("DATABASE_URL").expect("Must specify DATABASE_URL=postgres://....");
    let mut database_config = HashMap::new();
    let mut databases = HashMap::new();
    database_config.insert("url", rocket::config::Value::from(url));
    databases.insert("quote_db", rocket::config::Value::from(database_config));
    let config = rocket::Config::build(rocket::config::Environment::Production)
        .extra("databases", databases)
        .finalize()
        .unwrap();

    let routes = routes![
        index,
        session_create,
        user_create,
        file_create,
    ];
    let r = rocket::custom(config)
        .mount("/", routes)
        .register(catchers![not_found])
        .attach(Database::fairing());
    let connection = Database::get_one(&r)
        .expect("Expected database connection to be available.");
    embedded_migrations::run_with_output(&*connection, &mut std::io::stdout())
        .expect("Migrations have not been successful.");
    r.launch();
}
