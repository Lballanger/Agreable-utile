-- Verify l_agreable_utile:category on pg

BEGIN;

SELECT * FROM private.category WHERE false;

ROLLBACK;
