-- Revert l_agreable_utile:payment from pg

BEGIN;

DROP TABLE private.payment;

COMMIT;
