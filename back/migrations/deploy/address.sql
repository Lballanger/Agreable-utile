-- Deploy l_agreable_utile:article to pg

BEGIN;

CREATE TABLE private.address (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    civility TEXT NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    country TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code TEXT NOT NULL, 
    additional_info TEXT,
    phone TEXT,
    user_id INT NOT NULL REFERENCES private."user"(id)
);

COMMIT;
