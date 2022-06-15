-- Verify l_agreable_utile:order_line on pg

BEGIN;

SELECT * FROM private.order_line WHERE false;

ROLLBACK;
