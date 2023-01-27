-- Revert l_agreable_utile:article from pg

BEGIN;

DROP TRIGGER update_article_status ON private.article;

DROP TRIGGER update_article_status_insert ON private.article;

DROP FUNCTION private.update_article_status();

DROP TABLE private.article;

COMMIT;