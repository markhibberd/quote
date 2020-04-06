use crate::data;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct UserCreateRequest {
    pub email: String,
    pub password: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct UserCreateResponse {
    pub email: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct SessionCreateRequest {
    pub email: String,
    pub password: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct SessionCreateResponse {
    pub token: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct QuoteFileCreateRequest {
    pub name: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct QuoteFileCreateResponse {
    #[serde(flatten)]
    pub file: QuoteFile,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct QuoteFileListResponse {
    pub files: Vec<QuoteFile>,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct QuoteListResponse {
    #[serde(flatten)]
    pub file: QuoteFile,
    pub quotes: Vec<Quote>,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct QuoteGetResponse {
    #[serde(flatten)]
    pub quote: Quote,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
#[serde(rename_all = "kebab-case")]
pub enum Permission {
    Manage,
    Write,
    Read,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct QuoteFile {
    pub id: i64,
    pub name: String,
    pub access: Permission,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct Quote {
    pub id: i64,
    pub content: String,
}

impl From<Permission> for data::Permission {
    fn from(v: Permission) -> data::Permission {
        match v {
            Permission::Manage => data::Permission::Manage,
            Permission::Write => data::Permission::Write,
            Permission::Read => data::Permission::Read,
        }
    }
}

impl From<data::Permission> for Permission {
    fn from(v: data::Permission) -> Permission {
        match v {
            data::Permission::Manage => Permission::Manage,
            data::Permission::Write => Permission::Write,
            data::Permission::Read => Permission::Read,
        }
    }
}


impl From<QuoteFile> for data::Keyed<data::QuoteFile> {
    fn from(v: QuoteFile) -> data::Keyed<data::QuoteFile> {
        data::Keyed {
            key: data::Key(v.id),
            value: data::QuoteFile {
                name: v.name,
                access: v.access.into(),
            },
        }
    }
}

impl From<data::Keyed<data::QuoteFile>> for QuoteFile {
    fn from(v: data::Keyed<data::QuoteFile>) -> QuoteFile {
        QuoteFile {
            id: v.key.to_i64(),
            name: v.value.name,
            access: v.value.access.into(),
        }
    }
}


#[cfg(test)]
mod test {
    use crate::serial::{
        QuoteFile,
        Permission,
        SessionCreateRequest,
        SessionCreateResponse,
        UserCreateRequest,
        UserCreateResponse,
        QuoteFileCreateRequest,
        QuoteFileCreateResponse,
        QuoteFileListResponse,
    };

    use insta::assert_json_snapshot;

    #[test]
    fn test_user_create_request() {
        assert_json_snapshot!(UserCreateRequest {
            email: "test@example.com".to_string(),
            password: "12345678".to_string(),
        });
    }

    #[test]
    fn test_user_create_response() {
        assert_json_snapshot!(UserCreateResponse {
            email: "test@example.com".to_string(),
        });
    }

    #[test]
    fn test_session_create_request() {
        assert_json_snapshot!(SessionCreateRequest {
            email: "test@example.com".to_string(),
            password: "12345678".to_string(),
        });
    }

    #[test]
    fn test_session_create_response() {
        assert_json_snapshot!(SessionCreateResponse {
            token: "some-magik-token".to_string(),
        });
    }

    #[test]
    fn test_quote_file_create_request() {
        assert_json_snapshot!(QuoteFileCreateRequest {
            name: "Good quotes".to_string(),
        });
    }

    #[test]
    fn test_quote_file_create_response() {
        assert_json_snapshot!(QuoteFileCreateResponse {
            file: QuoteFile {
                id: 1,
                name: "Good quotes".to_string(),
                access: Permission::Manage,
            }
        });
    }

    #[test]
    fn test_quote_file_list_response() {
        assert_json_snapshot!(QuoteFileListResponse {
            files: vec![
                QuoteFile {
                    id: 1,
                    name: "Good quotes".to_string(),
                    access: Permission::Manage,
                },
                QuoteFile {
                    id: 2,
                    name: "Bad quotes".to_string(),
                    access: Permission::Read,
                }
            ],
        });
    }

    #[test]
    fn test_quote_file() {
        assert_json_snapshot!(QuoteFile {
            id: 1,
            name: "Good quotes".to_string(),
            access: Permission::Manage,
        });
    }

    #[test]
    fn test_permission() {
        assert_json_snapshot!(Permission::Manage);
        assert_json_snapshot!(Permission::Write);
        assert_json_snapshot!(Permission::Read);
    }

}
