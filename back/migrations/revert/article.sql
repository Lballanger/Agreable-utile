-- Revert l_agreable_utile:article from pg

BEGIN;

DROP TABLE private.article;

COMMIT;
