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
        `SELECT 
          article.id AS id, 
          description, 
          image, 
          article.name AS name, 
          price_wt, quantity, 
          status, 
          created_at, 
          updated_at, 
          category.name AS category_name, 
          category.id AS category_id 
        FROM 
          private.article  
        JOIN 
          private.category 
        ON 
          article.category_id = category.id;`,
      );
      return rows.map((article) => new Article(article));
    } catch (error) {
      return new Error(error.detail ? error.detail : error.message);
    }
  }

  static async findOneById(id) {
    try {
      const { rows } = await client.query(
        `SELECT 
          article.id AS id, 
          description, 
          image, 
          article.name AS name, 
          price_wt, 
          quantity, 
          status, 
          created_at, 
          updated_at, 
          category.name AS category_name, 
          category.id AS category_id 
        FROM 
          private.article  
        JOIN 
          private.category 
        ON 
          article.category_id = category.id
        WHERE 
          private.article.id= $1`,
        [id],
      );
      if (rows.length > 0) return new Article(rows[0]);
      return { error: `Article with id ${id} doesn't exist` };
    } catch (error) {
      return new Error(error.detail ? error.detail : error.message);
    }
  }

  async update() {
    try {
      const { rows } = await client.query(
        `UPDATE 
          private.article 
        SET 
          description = $1,
          image = $2,
          name = $3,
          price_wt = $4,
          quantity = $5,
          status = $6,
          updated_at = NOW(),
          category_id = $7
        WHERE 
          id = $8
        RETURNING *`,
        [
          this.description,
          this.image,
          this.name,
          this.price_wt,
          this.quantity,
          this.status,
          this.category_id,
          this.id,
        ],
      );
      if (!rows.length) return null;
      return new Article(rows[0]);
    } catch (error) {
      return new Error(error.detail ? error.detail : error.message);
    }
  }
}

module.exports = Article;
