-- Verify l_agreable_utile:achievement on pg

BEGIN;

SELECT * FROM private.achievement WHERE false;

ROLLBACK;
