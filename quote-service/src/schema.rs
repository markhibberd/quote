table! {
    quote (id) {
        id -> Int8,
        quote_file -> Int8,
        content -> Text,
        created_at -> Timestamptz,
    }
}

table! {
    quote_file (id) {
        id -> Int8,
        name -> Text,
    }
}

table! {
    quote_file_permission (user_account, quote_file) {
        user_account -> Int8,
        quote_file -> Int8,
        permission -> Int4,
    }
}

table! {
    session (id) {
        id -> Int8,
        token -> Text,
        user_account -> Int8,
        created_at -> Timestamptz,
        refreshed_at -> Timestamptz,
    }
}

table! {
    user_account (id) {
        id -> Int8,
        email -> Text,
        crypted -> Text,
    }
}

joinable!(quote -> quote_file (quote_file));
joinable!(quote_file_permission -> quote_file (quote_file));
joinable!(quote_file_permission -> user_account (user_account));
joinable!(session -> user_account (user_account));

allow_tables_to_appear_in_same_query!(
    quote,
    quote_file,
    quote_file_permission,
    session,
    user_account,
);
