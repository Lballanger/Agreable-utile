-- Revert l_agreable_utile:address from pg

BEGIN;

DROP TABLE private.address;

COMMIT;
