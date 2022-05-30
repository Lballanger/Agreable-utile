-- Revert l_agreable_utile:order_line from pg

BEGIN;

DROP TABLE private.order_line;

COMMIT;
