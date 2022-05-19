-- Verify l_agreable_utile:init on pg

BEGIN;

SELECT * FROM private.user WHERE false;

ROLLBACK;
