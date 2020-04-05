use crate::schema::*;

use chrono::{DateTime, Utc};

#[derive(Debug, Insertable)]
#[table_name="session"]
pub struct NewSession<'a> {
    pub token: &'a str,
    pub user_account: i64,
}


#[derive(Debug, Queryable)]
pub struct SessionRecord {
    pub id: i64,
    pub token: String,
    pub user_account: i64,
    pub created_at: DateTime<Utc>,
    pub refreshed_at: DateTime<Utc>,
}


#[derive(Debug, Insertable)]
#[table_name="user_account"]
pub struct NewUserAccount<'a> {
    pub email: &'a str,
    pub crypted: &'a str,
}

#[derive(Debug, Queryable)]
pub struct UserAccountRecord {
    pub id: i64,
    pub email: String,
    pub crypted: String,
}

#[derive(Debug, Insertable, Queryable)]
#[table_name="quote_file_permission"]
pub struct QuoteFilePermissionRecord {
    pub user_account: i64,
    pub quote_file: i64,
    pub permission: i32,
}

#[derive(Debug, Insertable)]
#[table_name="quote_file"]
pub struct NewQuoteFile<'a> {
    pub name: &'a str,
}

#[derive(Debug, Queryable)]
pub struct QuoteFileRecord {
    pub id: i64,
    pub name: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Insertable)]
#[table_name="quote"]
pub struct NewQuote<'a> {
    pub quote_file: i64,
    pub content: &'a str,
}

#[derive(Debug, Queryable)]
pub struct QuoteRecord {
    pub id: i64,
    pub quote_file: i64,
    pub content: String,
    pub created_at: DateTime<Utc>,
}
