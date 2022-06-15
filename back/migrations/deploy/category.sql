-- Deploy l_agreable_utile:category to pg

BEGIN;

CREATE TABLE private.category (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL
);

COMMIT;
