/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const client = require("../database");

class Category {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async create(name) {
    try {
      const { rows } = await client.query(
        "INSERT INTO private.category (name) VALUES ($1) RETURNING *",
        [name],
      );
      return new Category(rows[0]);
    } catch (error) {
      return new Error(error.detail ? error.detail : error.message);
    }
  }

  static async findAll() {
    try {
      const { rows } = await client.query("SELECT * FROM private.category");
      return rows.map((article) => new Category(article));
    } catch (error) {
      return new Error(error.detail ? error.detail : error.message);
    }
  }

  static async findByName(name) {
    try {
      const { rows } = await client.query(
        "SELECT * FROM private.category WHERE name = $1",
        [name],
      );
      return new Category(rows[0]);
    } catch (error) {
      return new Error(error.detail ? error.detail : error.message);
    }
  }
}

module.exports = Category;
