-- Verify l_agreable_utile:payment on pg

BEGIN;

SELECT * FROM private.payment WHERE false;

ROLLBACK;
