extern crate diesel;

#[database("quote_db")]
pub struct Database(pub diesel::PgConnection);
