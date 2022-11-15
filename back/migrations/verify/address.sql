-- Verify l_agreable_utile:address on pg

BEGIN;

SELECT * FROM private.address WHERE false;

ROLLBACK;
