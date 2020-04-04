use crate::api::error::Error;
use crate::data::{Key, UserAccount};
use crate::model::{NewUserAccount, UserAccountRecord};
use crate::schema;
use diesel::prelude::*;
use diesel::pg::PgConnection;

use scrypt::{ScryptParams, scrypt_simple};


pub fn create(db: &PgConnection, email: &str, password: &str) -> Result<Key, Error> {
    if password.len() < 8 {
        return Err(Error::WeakPassword);
    }
    let parameters = ScryptParams::new(14, 8, 1)?;
    let crypted = scrypt_simple(password, &parameters)?;
    create_crypted(db, email, &crypted)
}

pub fn create_crypted(db: &PgConnection, email: &str, crypted: &str) -> Result<Key, Error> {
    let record = diesel::insert_into(schema::user_account::table)
        .values(NewUserAccount { email, crypted })
        .on_conflict_do_nothing()
        .get_result::<UserAccountRecord>(db)
        .optional()?;
    match record {
        Some(record) => Ok(Key(record.id)),
        None => Err(Error::UserAlreadyExists),
    }
}

pub fn by_key(db: &PgConnection, key: &Key) -> Result<Option<UserAccount>, Error> {
    Ok(schema::user_account::dsl::user_account
        .filter(schema::user_account::dsl::id.eq(key.to_i64()))
        .get_result::<UserAccountRecord>(db)
        .optional()?.map(|u| UserAccount { key: Key(u.id), email: u.email.clone() }))
}


#[cfg(test)]
mod test {
    use crate::api;
    use crate::api::test::db_test;

    //static PASSWORD: &str = "12345678";
    static CRYPTED: &str = "$rscrypt$0$DggB$N2QXvv2BlUM7zl6A0+egOg==$NXGrxAIcOP0FgtcmZx5T9p8HUftBkkQHVSNu9WN5XLY=$";

    #[test]
    fn create() {
        db_test(|db| {
            let r = api::user::create(db, "test@example.com", "12345678");
            assert!(r.is_ok());
            Ok(())
        });
    }

    #[test]
    fn create_rejects_short_passwords() {
        db_test(|db| {

            let r = api::user::create(db, "test@example.com", "1234567");
            assert!(r.is_err());
            Ok(())
        });
    }

    #[test]
    fn create_rejects_duplicates() {
        db_test(|db| {
            let _ = api::user::create_crypted(db, "test@example.com", CRYPTED)?;
            let r = api::user::create_crypted(db, "test@example.com", CRYPTED);
            assert!(r.is_err());
            Ok(())
        });
    }

}
