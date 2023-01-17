/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const client = require("../database");

class Article {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  async create() {
    try {
      const { rows } = await client.query(
        `INSERT INTO 
          private.article (
            name, 
            description, 
            image, 
            price_wt,
            quantity, 
            category_id
          ) VALUES (
            $1, 
            $2, 
            $3, 
            $4, 
            $5,
            $6
          ) RETURNING *`,
        [
          this.name,
          this.description,
          this.image,
          this.price_wt,
          this.quantity,
          this.category_id,
        ],
      );
      return new Article(rows[0]);
    } catch (error) {
      return new Error(error.detail ? error.detail : error.message);
    }
  }

  static async findAll() {
    try {
      const { rows } = await client.query(
        "SELECT article.id AS article_id, description, image, article.name AS article_name, price_wt, quantity, status, created_at, updated_at, category.name AS category_name, category.id AS category_id FROM private.article  JOIN private.category ON article.category_id= category.id;",
      );
      return rows.map((article) => new Article(article));
    } catch (error) {
      return new Error(error.detail ? error.detail : error.message);
    }
  }

  static async findOneById(id) {
    try {
      const { rows } = await client.query(
        "SELECT * FROM private.article WHERE id=$1",
        [id],
      );
      if (rows.length > 0) return new Article(rows[0]);
      return { error: `Article with id ${id} doesn't exist` };
    } catch (error) {
      return new Error(error.detail ? error.detail : error.message);
    }
  }
}

module.exports = Article;
