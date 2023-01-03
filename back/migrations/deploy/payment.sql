-- Deploy l_agreable_utile:payment to pg

BEGIN;

CREATE TABLE private.payment (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cost INT NOT NULL,
    currency TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    payment_id TEXT NOT NULL,
    payment_organisation TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    payment_status TEXT NOT NULL DEFAULT FALSE,
    order_id INT NOT NULL REFERENCES private.order(id)
);

COMMIT;
