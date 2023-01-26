-- Verify l_agreable_utile:article on pg

BEGIN;

SELECT * FROM private.article;

INSERT INTO private.article (name, description, price_wt, quantity) VALUES ('Article 1', 'Description 1', 10, 0);

SELECT * FROM private.article WHERE status = 'Pas en stock';

UPDATE private.article SET quantity = 5 WHERE name = 'Article 1';

SELECT * FROM private.article WHERE status = 'En stock';


ROLLBACK;