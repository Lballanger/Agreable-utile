-- Deploy l_agreable_utile:order_line to pg

BEGIN;

CREATE TABLE private.order_line (
   id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   quantity INT NOT NULL,
   order_id INT NOT NULL REFERENCES private.order(id),
   article_id INT NOT NULL REFERENCES private.article(id)
);

COMMIT;
