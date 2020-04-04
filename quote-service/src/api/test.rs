use crate::api::error::Error;
use diesel::prelude::*;
use diesel::pg::PgConnection;
use std::panic;
use std::env;

diesel_migrations::embed_migrations!("./migrations");

pub fn db_test<T>(test: T) -> ()
    where T: FnOnce(&PgConnection) -> Result<(), Error> + panic::UnwindSafe
{
    let url = env::var("TEST_DATABASE_URL")
        .unwrap_or("postgres://quote_test:quote_test@localhost/quote_test".to_string());
    let connection = PgConnection::establish(&url)
        .expect("Could not establish test database connection");
    connection.test_transaction::<_, Error, _>(|| {
        embedded_migrations::run(&connection)
           .expect("Could not run migrations.");
        test(&connection)
    });
}
