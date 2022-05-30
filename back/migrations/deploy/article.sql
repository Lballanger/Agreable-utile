-- Deploy l_agreable_utile:article to pg

BEGIN;

CREATE TABLE private.article (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    price_wt MONEY NOT NULL 
);

COMMIT;
