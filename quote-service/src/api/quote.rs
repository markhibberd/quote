use crate::api::error::Error;
use crate::data::{Key, Keyed, Permission, Quote, QuoteFile};
use crate::model::{NewQuote, QuoteRecord, NewQuoteFile, QuoteFileRecord, QuoteFilePermissionRecord};
use crate::schema;

use diesel::prelude::*;
use diesel::sql_types;
use diesel::pg::PgConnection;


pub fn create_file(db: &PgConnection, name: &str) -> Result<Key, Error> {
    let record = diesel::insert_into(schema::quote_file::table)
        .values(NewQuoteFile { name })
        .get_result::<QuoteFileRecord>(db)?;
    Ok(Key(record.id))
}

pub fn share_file(db: &PgConnection, file: &Key, user: &Key, permission: &Permission) -> Result<(), Error> {
    let _ = diesel::insert_into(schema::quote_file_permission::table)
        .values(QuoteFilePermissionRecord { quote_file: file.to_i64(), user_account: user.to_i64(), permission: permission.to_i32() })
        .execute(db)?;
    Ok(())
}

pub fn list_files(db: &PgConnection, user: &Key) -> Result<Vec<Keyed<QuoteFile>>, Error> {
    Ok(schema::quote_file_permission::dsl::quote_file_permission
        .inner_join(schema::quote_file::dsl::quote_file)
        .filter(schema::quote_file_permission::dsl::user_account.eq(user.to_i64()))
        .order(schema::quote_file::dsl::name.asc())
        .get_results::<(QuoteFilePermissionRecord, QuoteFileRecord)>(db)?
        .into_iter()
        .map(|(permission, quote_file)| Keyed {
            key: Key(quote_file.id),
            value: QuoteFile {
                name: quote_file.name,
                access: Permission::from_i32(permission.permission)
            },
        })
        .collect())
}

pub fn add(db: &PgConnection, file: &Key, content: &str) -> Result<Key, Error> {
    let record = diesel::insert_into(schema::quote::table)
        .values(NewQuote { quote_file: file.to_i64(), content })
        .get_result::<QuoteRecord>(db)?;
    Ok(Key(record.id))
}

pub fn list(db: &PgConnection, file: &Key) -> Result<Vec<Keyed<Quote>>, Error> {
    Ok(schema::quote::dsl::quote
        .filter(schema::quote::dsl::quote_file.eq(file.to_i64()))
        .get_results::<QuoteRecord>(db)?
        .into_iter()
        .map(|quote| Keyed {
            key: Key(quote.id),
            value: Quote {
                content: quote.content,
                created: quote.created_at,
            },
        })
        .collect())
}

pub fn by_id(db: &PgConnection, quote: &Key) -> Result<Option<Keyed<Quote>>, Error> {
    Ok(schema::quote::dsl::quote
        .filter(schema::quote::dsl::id.eq(quote.to_i64()))
        .first::<QuoteRecord>(db)
        .optional()?
        .map(|quote| Keyed {
            key: Key(quote.id),
            value: Quote {
                content: quote.content,
                created: quote.created_at,
            },
        }))
}

pub fn random(db: &PgConnection, file: &Key) -> Result<Option<Keyed<Quote>>, Error> {
    no_arg_sql_function!(
        random,
        sql_types::Integer,
        "Represents the SQL RANDOM() function"
    );

    Ok(schema::quote::dsl::quote
        .filter(schema::quote::dsl::quote_file.eq(file.to_i64()))
        .order(random)
        .limit(1)
        .first::<QuoteRecord>(db)
        .optional()?
        .map(|quote| Keyed {
            key: Key(quote.id),
            value: Quote {
                content: quote.content,
                created: quote.created_at,
            },
        }))
}

#[cfg(test)]
mod test {
    use crate::api;
    use crate::api::test::db_test;
    use crate::data::{Key, Permission, QuoteFile};

    //static PASSWORD: &str = "12345678";
    static CRYPTED: &str = "$rscrypt$0$DggB$N2QXvv2BlUM7zl6A0+egOg==$NXGrxAIcOP0FgtcmZx5T9p8HUftBkkQHVSNu9WN5XLY=$";

    #[test]
    fn create_file() {
        db_test(|db| {
            let r = api::quote::create_file(db, "Some quote file");
            assert!(r.is_ok());
            Ok(())
        });
    }

    #[test]
    fn share_file() {
        db_test(|db| {
            let u = api::user::create_crypted(db, "test@example.com", CRYPTED)?;
            let f = api::quote::create_file(db, "Some quote file")?;
            let r = api::quote::share_file(db, &f, &u, &Permission::Manage);
            assert!(r.is_ok());
            Ok(())
        });
    }

    #[test]
    fn list_file() {
        db_test(|db| {
            let u = api::user::create_crypted(db, "test@example.com", CRYPTED)?;
            let f1 = api::quote::create_file(db, "A quote file")?;
            let f2 = api::quote::create_file(db, "Some other quote file")?;
            let f3 = api::quote::create_file(db, "Yet another quote file")?;
            api::quote::share_file(db, &f1, &u, &Permission::Manage)?;
            api::quote::share_file(db, &f2, &u, &Permission::Write)?;
            api::quote::share_file(db, &f3, &u, &Permission::Read)?;
            let files = api::quote::list_files(db, &u)?;
            assert_eq!(files.into_iter().map(|v| v.value).collect::<Vec<_>>(), vec![
                QuoteFile { name: "A quote file".to_string(), access: Permission::Manage },
                QuoteFile { name: "Some other quote file".to_string(), access: Permission::Write },
                QuoteFile { name: "Yet another quote file".to_string(), access: Permission::Read },
            ]);
            Ok(())
        });
    }

    #[test]
    fn add() {
        db_test(|db| {
            let f = api::quote::create_file(db, "A quote file")?;
            let r = api::quote::add(db, &f, "A nice quote");
            assert!(r.is_ok());
            Ok(())
        });
    }

    #[test]
    fn list() {
        db_test(|db| {
            let f = api::quote::create_file(db, "A quote file")?;
            let q = api::quote::add(db, &f, "A nice quote")?;
            let qs = api::quote::list(db, &f)?;
            assert_eq!(qs.len(), 1);
            assert_eq!(qs[0].key, q);
            assert_eq!(qs[0].value.content, "A nice quote");
            Ok(())
        });
    }

    #[test]
    fn by_id() {
        db_test(|db| {
            let f = api::quote::create_file(db, "A quote file")?;
            let q = api::quote::add(db, &f, "A nice quote")?;
            let r = api::quote::by_id(db, &q)?;
            assert!(r.is_some());
            let r = r.expect("is_some");
            assert_eq!(r.key, q);
            assert_eq!(r.value.content, "A nice quote");
            Ok(())
        });
    }


    #[test]
    fn by_id_not_found() {
        db_test(|db| {
            let r = api::quote::by_id(db, &Key(-1))?;
            assert!(r.is_none());
            Ok(())
        });
    }

    #[test]
    fn random() {
        db_test(|db| {
            let f = api::quote::create_file(db, "A quote file")?;
            let q = api::quote::add(db, &f, "A nice quote")?;
            let r = api::quote::random(db, &f)?;
            assert!(r.is_some());
            let r = r.expect("is_some");
            assert_eq!(r.key, q);
            assert_eq!(r.value.content, "A nice quote");
            Ok(())
        });
    }

    #[test]
    fn random_empty() {
        db_test(|db| {
            let f = api::quote::create_file(db, "A quote file")?;
            let r = api::quote::random(db, &f)?;
            assert!(r.is_none());
            Ok(())
        });
    }
}
