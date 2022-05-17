/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const client = require('../database');

class User {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async getById(id) {
    try {
      const result = await client.query(`SELECT * FROM "user" WHERE id = $1 `, [
        id,
      ]);
      if (result.rows.length === 0) {
        return null;
      }
      return new User(result.rows[0]);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = User;
