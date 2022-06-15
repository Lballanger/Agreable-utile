-- Verify l_agreable_utile:article on pg

BEGIN;

SELECT * FROM private.article WHERE false;

ROLLBACK;
