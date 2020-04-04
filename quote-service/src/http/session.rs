use crate::api::session;
use crate::data::{Token, UserAccount};
use crate::http::db::Database;
use crate::http::error::HttpError;
use rocket::http::Status;
use rocket::request::{self, FromRequest, Request};
use rocket::outcome::Outcome;

pub struct Session {
    pub token: Token,
    pub user: UserAccount,
}

impl<'a, 'r> FromRequest<'a, 'r> for Session {
    type Error = HttpError;

    fn from_request(request: &'a Request<'r>) -> request::Outcome<Session, HttpError> {
        let db = request.guard::<Database>()
            .map_failure(|_| (Status::InternalServerError, HttpError::ServerError { underlying: None }))?;
        let headers: Vec<_> = request.headers().get("Authorization").collect();
        if headers.len() != 1 {
            return Outcome::Failure((Status::Forbidden, HttpError::Forbidden));
        }
        let token = Token(headers[0].to_string());
        match session::check(&*db, &token) {
            Err(e) => Outcome::Failure((Status::Forbidden, e.into())),
            Ok(None) => Outcome::Failure((Status::Forbidden, HttpError::Forbidden)),
            Ok(Some(user)) => Outcome::Success(Session { token: token.clone(), user }),
        }
    }
}
