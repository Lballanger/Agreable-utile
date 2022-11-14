/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const client = require('../database');

class Achievement {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async findAll() {
    try {
      const { rows } = await client.query('SELECT * FROM private.achievement');
      return rows.map((achievement) => new Achievement(achievement));
    } catch (error) {
      return new Error(error.detail ? error.detail : error.message);
    }
  }

  static async findOneById(id) {
    try {
      const { rows } = await client.query(
        'SELECT * FROM private.achievement WHERE id=$1',
        [id],
      );
      if (rows.length > 0) return new Achievement(rows[0]);
      return { error: `Achievement with id ${id} doesn't exist` };
    } catch (error) {
      return new Error(error.detail ? error.detail : error.message);
    }
  }
}

module.exports = Achievement;
