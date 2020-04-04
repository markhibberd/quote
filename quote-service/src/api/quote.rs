use crate::api::error::Error;
use crate::data::{Key, Permission};
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


pub fn list_files(db: &PgConnection, user: &Key) -> Result<(), Error> {
    // TODO: join permission on file, and return a record containing both details (so permission details are available)
    Ok(())
}

#[cfg(test)]
mod test {
    use crate::api;
    use crate::api::test::db_test;
    use crate::data::Permission;

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

}
