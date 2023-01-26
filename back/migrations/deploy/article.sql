-- Deploy l_agreable_utile:article to pg

BEGIN;

CREATE TABLE private.article (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT[],
    price_wt DECIMAL(12,2) NOT NULL, 
    quantity INT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Pas en stock',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    category_id INT REFERENCES private.category(id)
);

CREATE OR REPLACE FUNCTION private.update_article_status() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.quantity = 0 THEN
        NEW.status := 'Pas en stock';
    ELSE
        NEW.status := 'En stock';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_article_status_insert
BEFORE INSERT ON private.article
FOR EACH ROW
EXECUTE FUNCTION private.update_article_status();

CREATE TRIGGER update_article_status
BEFORE UPDATE ON private.article
FOR EACH ROW
EXECUTE FUNCTION private.update_article_status();

COMMIT;