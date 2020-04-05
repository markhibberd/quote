use crate::api::error::Error;
use crate::data::{Key, Keyed, Permission, QuoteFile};
use crate::model::{NewQuoteFile, QuoteFileRecord, QuoteFilePermissionRecord};
use crate::schema;

use diesel::prelude::*;
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

#[cfg(test)]
mod test {
    use crate::api;
    use crate::api::test::db_test;
    use crate::data::{Permission, QuoteFile};

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


}
