-- Revert l_agreable_utile:category from pg

BEGIN;

DROP TABLE private.category;

COMMIT;
