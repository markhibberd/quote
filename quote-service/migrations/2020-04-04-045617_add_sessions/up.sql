-- Your SQL goes here

CREATE TABLE session (
    id BIGSERIAL PRIMARY KEY
  , token TEXT NOT NULL UNIQUE
  , user_account BIGINT NOT NULL REFERENCES user_account(id)
  , created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
  , refreshed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
