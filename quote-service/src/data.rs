
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UserAccount {
    pub key: Key,
    pub email: String,
}


#[derive(Debug, Clone, PartialEq, Eq)]
pub struct QuoteFile {
    pub name: String,
    pub access: Permission,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Token(pub String);

impl Token {
    pub fn as_string(self) -> String {
        let Token(v) = self; v
    }

    pub fn to_str(&self) -> &str {
        let Token(v) = self; &v
    }
}


#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Keyed<A> {
    pub key: Key,
    pub value: A,
}

impl<A> Keyed<A> {
    pub fn map<B, F: FnOnce(A) -> B>(self, f: F) -> Keyed<B> {
        let Keyed { key, value } = self;
        let value = f(value);
        Keyed { key, value }
    }
}
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Key(pub i64);

impl Key {
    pub fn to_i64(&self) -> i64 {
        let Key(v) = self; *v
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Permission {
    Manage,
    Write,
    Read,
}

impl Permission {
    pub fn to_i32(&self) -> i32 {
       match self {
           Permission::Manage => 2,
           Permission::Write => 1,
           Permission::Read => 0,
       }
    }

    pub fn from_i32(v: i32) -> Permission {
        match v {
            2 => Permission::Manage,
            1 => Permission::Write,
            _ => Permission::Read,
        }
    }
}

#[cfg(test)]
mod test {
    use crate::data::Permission;

    #[test]
    fn permission_i32_symmetry() {
        assert_eq!(Permission::Manage, Permission::from_i32(Permission::Manage.to_i32()));
        assert_eq!(Permission::Write, Permission::from_i32(Permission::Write.to_i32()));
        assert_eq!(Permission::Read, Permission::from_i32(Permission::Read.to_i32()));
    }

    #[test]
    fn permission_i32_out_of_bounds_safe_fallback() {
        assert_eq!(Permission::Read, Permission::from_i32(0));
        assert_eq!(Permission::Read, Permission::from_i32(-1));
        assert_eq!(Permission::Read, Permission::from_i32(3));
        assert_eq!(Permission::Read, Permission::from_i32(123456));
    }
}
