use crate::api::error::Error;
use rocket::http::Status;
use rocket::response::{self, Responder, status};
use rocket::request::Request;
use rocket_contrib::json::Json;
use serde::{Serialize, Deserialize};

#[derive(Clone, Debug, Deserialize, Serialize, PartialEq)]
#[serde(rename_all = "kebab-case")]
pub enum ErrorCode {
    UserAlreadyExists,
    WeakPassword,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(untagged)]
pub enum HttpError {
    ServerError { #[serde(skip)] underlying: Option<Error> },
    BadRequest { code: ErrorCode, message: Option<String>, #[serde(skip)] underlying: Option<Error> },
    NotFound,
    Forbidden,
}

impl From<Error> for HttpError {
    fn from(e: Error) -> HttpError {
        match e {
            Error::NotAuthorized => HttpError::Forbidden,
            Error::UserAlreadyExists => HttpError::BadRequest { code: ErrorCode::UserAlreadyExists, message: None, underlying: Some(e) },
            Error::WeakPassword => HttpError::BadRequest { code: ErrorCode::WeakPassword, message: None, underlying: Some(e) },
            Error::ScryptInvalidParams(_) => HttpError::ServerError { underlying: Some(e) },
            Error::ScryptCheckError(_) => HttpError::ServerError { underlying: Some(e) },
            Error::SessionNotUnique => HttpError::ServerError { underlying: Some(e) },
            Error::Io(_) => HttpError::ServerError { underlying: Some(e) },
            Error::Db(_) => HttpError::ServerError { underlying: Some(e) },
        }
    }
}


impl<'r> Responder<'r> for HttpError {
    fn respond_to(self, req: &Request) -> response::Result<'r> {
        match &self {
            HttpError::ServerError { underlying } => {
                eprintln!("server-error: {:?}", underlying);
                status::Custom(Status::InternalServerError, Json(json!(self))).respond_to(req)
            },
            HttpError::BadRequest { underlying, .. } => {
                eprintln!("bad-request: {:?}", underlying);
                status::Custom(Status::BadRequest, Json(json!(self))).respond_to(req)
            },
            HttpError::NotFound =>
                status::Custom(Status::NotFound, Json(json!({ "code": "not-found" }))).respond_to(req),
            HttpError::Forbidden =>
                status::Custom(Status::Forbidden, Json(json!({ "code": "forbidden" }))).respond_to(req),
        }
    }
}
