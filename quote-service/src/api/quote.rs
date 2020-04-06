use crate::api::error::Error;
use crate::data::{Key, Keyed, Permission, Quote, QuoteFile};
use crate::model::{NewQuote, QuoteRecord, NewQuoteFile, QuoteFileRecord, QuoteFilePermissionRecord};
use crate::schema;

use diesel::prelude::*;
use diesel::sql_types;
use diesel::pg::PgConnection;


pub fn create_file(db: &PgConnection, user: &Key, name: &str) -> Result<Key, Error> {
    let record = diesel::insert_into(schema::quote_file::table)
        .values(NewQuoteFile { name })
        .get_result::<QuoteFileRecord>(db)?;
    let _ = diesel::insert_into(schema::quote_file_permission::table)
        .values(QuoteFilePermissionRecord { quote_file: record.id, user_account: user.to_i64(), permission: Permission::Manage.to_i32() })
        .execute(db)?;
    Ok(Key(record.id))
}

pub fn share_file(db: &PgConnection, sharer: &Key, file: &Key, sharee: &Key, permission: &Permission) -> Result<(), Error> {
    if !has_access(db, sharer, file, Permission::Read)? {
        return Err(Error::NotAuthorized);
    }
    db.transaction(|| {
        diesel::delete(schema::quote_file_permission::dsl::quote_file_permission
           .filter(schema::quote_file_permission::dsl::quote_file.eq(file.to_i64())))
           .filter(schema::quote_file_permission::dsl::user_account.eq(sharee.to_i64()))
           .execute(db)?;

        let _ = diesel::insert_into(schema::quote_file_permission::table)
            .values(QuoteFilePermissionRecord { quote_file: file.to_i64(), user_account: sharee.to_i64(), permission: permission.to_i32() })
            .execute(db)?;
        Ok(())
    })
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

pub fn by_id_file(db: &PgConnection, user: &Key, file: &Key) -> Result<Option<Keyed<QuoteFile>>, Error> {
    Ok(schema::quote_file_permission::dsl::quote_file_permission
        .inner_join(schema::quote_file::dsl::quote_file)
        .filter(schema::quote_file_permission::dsl::user_account.eq(user.to_i64()))
        .filter(schema::quote_file_permission::dsl::quote_file.eq(file.to_i64()))
        .first::<(QuoteFilePermissionRecord, QuoteFileRecord)>(db)
        .optional()?
        .map(|(permission, quote_file)| Keyed {
            key: Key(quote_file.id),
            value: QuoteFile {
                name: quote_file.name,
                access: Permission::from_i32(permission.permission)
            },
        }))
}

pub fn add(db: &PgConnection, file: &Key, content: &str) -> Result<Key, Error> {
    let record = diesel::insert_into(schema::quote::table)
        .values(NewQuote { quote_file: file.to_i64(), content })
        .get_result::<QuoteRecord>(db)?;
    Ok(Key(record.id))
}

pub fn has_access(db: &PgConnection, user: &Key, file: &Key, access: Permission) -> Result<bool, Error> {
    Ok(schema::quote_file_permission::dsl::quote_file_permission
        .filter(schema::quote_file_permission::dsl::user_account.eq(user.to_i64()))
        .filter(schema::quote_file_permission::dsl::quote_file.eq(file.to_i64()))
        .filter(schema::quote_file_permission::dsl::permission.ge(access.to_i32()))
        .first::<QuoteFilePermissionRecord>(db)
        .optional()?
        .is_some())
}

pub fn list(db: &PgConnection, user: &Key, file: &Key) -> Result<Vec<Keyed<Quote>>, Error> {
    if !has_access(db, user, file, Permission::Read)? {
        return Err(Error::NotAuthorized);
    }

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

pub fn by_id(db: &PgConnection, user: &Key, quote: &Key) -> Result<Option<Keyed<Quote>>, Error> {
    Ok(schema::quote::dsl::quote
        .inner_join(schema::quote_file::dsl::quote_file.inner_join(schema::quote_file_permission::dsl::quote_file_permission))
        .filter(schema::quote::dsl::id.eq(quote.to_i64()))
        .filter(schema::quote_file_permission::dsl::user_account.eq(user.to_i64()))
        .filter(schema::quote_file_permission::dsl::permission.ge(Permission::Read.to_i32()))
        .first::<(QuoteRecord, (QuoteFileRecord, QuoteFilePermissionRecord))>(db)
        .optional()?
        .map(|(quote, _)| Keyed {
            key: Key(quote.id),
            value: Quote {
                content: quote.content,
                created: quote.created_at,
            },
        }))
}

pub fn random(db: &PgConnection, user: &Key, file: &Key) -> Result<Option<Keyed<Quote>>, Error> {
    if !has_access(db, user, file, Permission::Read)? {
        return Err(Error::NotAuthorized);
    }

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
            let u = api::user::create_crypted(db, "test@example.com", CRYPTED)?;
            let r = api::quote::create_file(db, &u, "Some quote file");
            assert!(r.is_ok());
            Ok(())
        });
    }

    #[test]
    fn share_file() {
        db_test(|db| {
            let u1 = api::user::create_crypted(db, "test1@example.com", CRYPTED)?;
            let u2 = api::user::create_crypted(db, "test2@example.com", CRYPTED)?;
            let f = api::quote::create_file(db, &u1, "Some quote file")?;
            api::quote::share_file(db, &u1, &f, &u2, &Permission::Read)?;

            let r = api::quote::by_id_file(db, &u1, &f)?;
            assert!(r.is_some());
            let r = r.expect("is_some()");
            assert_eq!(r.value.name, "Some quote file");
            assert_eq!(r.value.access, Permission::Manage);

            let r = api::quote::by_id_file(db, &u2, &f)?;
            assert!(r.is_some());
            let r = r.expect("is_some()");
            assert_eq!(r.value.name, "Some quote file");
            assert_eq!(r.value.access, Permission::Read);

            Ok(())
        });
    }

    #[test]
    fn share_file_override() {
        db_test(|db| {
            let u1 = api::user::create_crypted(db, "test1@example.com", CRYPTED)?;
            let u2 = api::user::create_crypted(db, "test2@example.com", CRYPTED)?;
            let f = api::quote::create_file(db, &u1, "Some quote file")?;
            api::quote::share_file(db, &u1, &f, &u2, &Permission::Read)?;

            let r = api::quote::by_id_file(db, &u2, &f)?;
            assert!(r.is_some());
            let r = r.expect("is_some()");
            assert_eq!(r.value.name, "Some quote file");
            assert_eq!(r.value.access, Permission::Read);

            api::quote::share_file(db, &u1, &f, &u2, &Permission::Write)?;
            let r = api::quote::by_id_file(db, &u2, &f)?;
            assert!(r.is_some());
            let r = r.expect("is_some()");
            assert_eq!(r.value.name, "Some quote file");
            assert_eq!(r.value.access, Permission::Write);

            api::quote::share_file(db, &u1, &f, &u2, &Permission::Read)?;
            let r = api::quote::by_id_file(db, &u2, &f)?;
            assert!(r.is_some());
            let r = r.expect("is_some()");
            assert_eq!(r.value.name, "Some quote file");
            assert_eq!(r.value.access, Permission::Read);

            Ok(())
        });
    }

    #[test]
    fn list_file() {
        db_test(|db| {
            let u1 = api::user::create_crypted(db, "test1@example.com", CRYPTED)?;
            let u2 = api::user::create_crypted(db, "test2@example.com", CRYPTED)?;
            let f1 = api::quote::create_file(db, &u2, "A quote file")?;
            let f2 = api::quote::create_file(db, &u2, "Some other quote file")?;
            let f3 = api::quote::create_file(db, &u2, "Yet another quote file")?;
            api::quote::share_file(db, &u2, &f1, &u1, &Permission::Manage)?;
            api::quote::share_file(db, &u2, &f2, &u1, &Permission::Write)?;
            api::quote::share_file(db, &u2, &f3, &u1, &Permission::Read)?;
            let files = api::quote::list_files(db, &u1)?;
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
            let u = api::user::create_crypted(db, "test@example.com", CRYPTED)?;
            let f = api::quote::create_file(db, &u, "A quote file")?;
            let r = api::quote::add(db, &f, "A nice quote");
            assert!(r.is_ok());
            Ok(())
        });
    }

    #[test]
    fn list() {
        db_test(|db| {
            let u = api::user::create_crypted(db, "test@example.com", CRYPTED)?;
            let f = api::quote::create_file(db, &u, "A quote file")?;
            let q = api::quote::add(db, &f, "A nice quote")?;
            let qs = api::quote::list(db, &u, &f)?;
            assert_eq!(qs.len(), 1);
            assert_eq!(qs[0].key, q);
            assert_eq!(qs[0].value.content, "A nice quote");
            Ok(())
        });
    }

    #[test]
    fn list_write_access() {
        db_test(|db| {
            let u = api::user::create_crypted(db, "test@example.com", CRYPTED)?;
            let f = api::quote::create_file(db, &u, "A quote file")?;
            let q = api::quote::add(db, &f, "A nice quote")?;
            let qs = api::quote::list(db, &u, &f)?;
            assert_eq!(qs.len(), 1);
            assert_eq!(qs[0].key, q);
            assert_eq!(qs[0].value.content, "A nice quote");
            Ok(())
        });
    }

    #[test]
    fn by_id() {
        db_test(|db| {
            let u = api::user::create_crypted(db, "test@example.com", CRYPTED)?;
            let f = api::quote::create_file(db, &u, "A quote file")?;
            let q = api::quote::add(db, &f, "A nice quote")?;
            let r = api::quote::by_id(db, &u, &q)?;
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
            let u = api::user::create_crypted(db, "test@example.com", CRYPTED)?;
            let r = api::quote::by_id(db, &u, &Key(-1))?;
            assert!(r.is_none());
            Ok(())
        });
    }

    #[test]
    fn random() {
        db_test(|db| {
            let u = api::user::create_crypted(db, "test@example.com", CRYPTED)?;
            let f = api::quote::create_file(db, &u, "A quote file")?;
            let q = api::quote::add(db, &f, "A nice quote")?;
            let r = api::quote::random(db, &u, &f)?;
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
            let u = api::user::create_crypted(db, "test@example.com", CRYPTED)?;
            let f = api::quote::create_file(db, &u, "A quote file")?;
            let r = api::quote::random(db, &u, &f)?;
            assert!(r.is_none());
            Ok(())
        });
    }
}
