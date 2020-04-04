use scrypt::errors::{CheckError, InvalidParams};

#[derive(Debug)]
pub enum Error {
    UserAlreadyExists,
    WeakPassword,
    NotAuthorized,
    SessionNotUnique,
    ScryptInvalidParams(InvalidParams),
    ScryptCheckError(CheckError),
    Io(std::io::Error),
    Db(diesel::result::Error),
}

impl From<InvalidParams> for Error {
    fn from(e: InvalidParams) -> Error {
        Error::ScryptInvalidParams(e)
    }
}

impl From<std::io::Error> for Error {
    fn from(e: std::io::Error) -> Error {
        Error::Io(e)
    }
}

impl From<diesel::result::Error> for Error {
    fn from(e: diesel::result::Error) -> Error {
        Error::Db(e)
    }
}
