-- Deploy l_agreable_utile:achievement to pg

BEGIN;

CREATE TABLE private.achievement (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    category_id INT REFERENCES private.category(id)
);

COMMIT;
