/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const client = require('../database');

class Article {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async findAll() {
    try {
      const { rows } = await client.query('SELECT * FROM private.article');
      return rows.map((article) => new Article(article));
    } catch (error) {
      return new Error(error.detail ? error.detail : error.message);
    }
  }

  static async findOneById(id) {
    try {
      const { rows } = await client.query(
        'SELECT * FROM private.article WHERE id=$1',
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
