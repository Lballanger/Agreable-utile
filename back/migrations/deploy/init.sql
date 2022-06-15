-- Deploy on-demenage:user_table to pg

BEGIN;


CREATE SCHEMA private;

-- citext is a built-in extension from Postgresql, it's insensitive
-- In this case we consider that 'test@test.com' is the same user than 'tEST@TesT.CoM'
CREATE EXTENSION citext;
CREATE DOMAIN email_type AS citext
  CHECK ( value ~ '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' );

CREATE TABLE private."user" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  civility TEXT NOT NULL,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  email email_type UNIQUE,
  email_verified_at TIMESTAMPTZ DEFAULT NULL,
  password TEXT NOT NULL,
  date_of_birth DATE NOT NULL
  city TEXT,
  postal_code INT,
);

CREATE TABLE private.order (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES private."user"(id),
  order_number INT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status BOOLEAN DEFAULT false
);

COMMIT;
