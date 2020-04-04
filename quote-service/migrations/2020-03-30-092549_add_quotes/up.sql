-- Your SQL goes here

CREATE TABLE user_account (
    id BIGSERIAL PRIMARY KEY
  , email TEXT NOT NULL UNIQUE
  , crypted TEXT NOT NULL
);

CREATE TABLE quote_file (
    id BIGSERIAL PRIMARY KEY
  , name TEXT NOT NULL UNIQUE
);

CREATE TABLE quote_file_permission (
    user_account BIGINT NOT NULL REFERENCES user_account(id)
  , quote_file BIGINT NOT NULL REFERENCES quote_file(id)
  , permission INT NOT NULL
  , PRIMARY KEY (user_account, quote_file)
);

CREATE TABLE quote (
    id BIGSERIAL PRIMARY KEY
  , quote_file BIGINT NOT NULL REFERENCES quote_file(id)
  , content TEXT NOT NULL
  , created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
