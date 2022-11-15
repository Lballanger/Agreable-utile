-- Revert l_agreable_utile:init from pg

BEGIN;

DROP TABLE private.order;

DROP TABLE private.temporary_user;

DROP TABLE private.user;

DROP DOMAIN email_type;

DROP EXTENSION citext;

DROP SCHEMA private;

COMMIT;
