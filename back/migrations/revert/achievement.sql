-- Revert l_agreable_utile:achievement from pg

BEGIN;

DROP TABLE private.achievement;

COMMIT;
