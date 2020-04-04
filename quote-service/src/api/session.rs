use crate::api::user;
use crate::api::error::Error;
use crate::data::{Key, Token, UserAccount};
use crate::model::{NewSession, SessionRecord, UserAccountRecord};
use crate::schema;

use chrono::{DateTime, Utc, Duration};
use diesel::prelude::*;
use rand::prelude::*;
use scrypt::scrypt_check;

pub fn new_token() -> Token {
    let mut data = [0u8; 32];
    rand::thread_rng().fill_bytes(&mut data);
    Token(base16::encode_lower(&data))
}

pub fn create(db: &PgConnection, email: &str, password: &str) -> Result<Token, Error> {
    let user_account = schema::user_account::dsl::user_account
        .filter(schema::user_account::dsl::email.eq(email))
        .get_result::<UserAccountRecord>(db)
        .optional()?;
    let user_account_id = if let Some(user_account) = user_account {
        match scrypt_check(password, &user_account.crypted) {
          Ok(()) => user_account.id,
          Err(scrypt::errors::CheckError::HashMismatch) => return Err(Error::NotAuthorized),
          Err(scrypt::errors::CheckError::InvalidFormat) => return Err(Error::ScryptCheckError(scrypt::errors::CheckError::InvalidFormat).into()),
        }
    } else {
        let _dont_care_if_is_valid = scrypt_check(password, "$rscrypt$0$DggB$N2QXvv2BlUM7zl6A0+egOg==$NXGrxAIcOP0FgtcmZx5T9p8HUftBkkQHVSNu9WN5XLY=$");
        return Err(Error::NotAuthorized);
    };
    let token = new_token();
    let count = diesel::insert_into(schema::session::table)
        .values(NewSession { user_account: user_account_id, token: token.to_str() })
        .on_conflict_do_nothing()
        .execute(db)?;
    if count != 1 {
        return Err(Error::SessionNotUnique);
    }
    Ok(token)
}

pub fn check(db: &PgConnection, token: &Token) -> Result<Option<UserAccount>, Error> {
    let now: DateTime<Utc> = Utc::now();
    let one_hour: DateTime<Utc> = now + Duration::hours(1);
    let updated = diesel::update(
        schema::session::dsl::session.filter(
            schema::session::dsl::token.eq(token.to_str()).and(
            schema::session::dsl::refreshed_at.gt(&one_hour))
        ))
       .set(schema::session::dsl::refreshed_at.eq(now))
       .get_result::<SessionRecord>(db)
       .optional()?;
    match updated {
        None => Ok(None),
        Some(updated) => user::by_key(db, &Key(updated.user_account)),
    }
}

#[cfg(test)]
mod test {
    use crate::api;
    use crate::api::test::db_test;

    static PASSWORD: &str = "12345678";
    static CRYPTED: &str = "$rscrypt$0$DggB$N2QXvv2BlUM7zl6A0+egOg==$NXGrxAIcOP0FgtcmZx5T9p8HUftBkkQHVSNu9WN5XLY=$";

    #[test]
    fn create() {
        db_test(|db| {
            api::user::create_crypted(db, "test@example.com", CRYPTED)?;
            let r = api::session::create(db, "test@example.com", PASSWORD);
            assert!(r.is_ok());
            assert_eq!(r?.to_str().len(), 64);
            Ok(())
        });
    }

    #[test]
    fn create_fails_with_bad_password() {
        db_test(|db| {
            api::user::create_crypted(db, "test@example.com", CRYPTED)?;
            let r = api::session::create(db, "test@example.com", "bad");
            assert!(r.is_err());
            Ok(())
        });
    }

}
