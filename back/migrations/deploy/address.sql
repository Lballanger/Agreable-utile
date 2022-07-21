-- Deploy l_agreable_utile:article to pg

BEGIN;

CREATE TABLE private.address (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    country TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code INT NOT NULL, 
    additional_info TEXT,
    user_id INT NOT NULL REFERENCES private."user"(id)
);

COMMIT;
