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
      const result = await client.query(
        `SELECT id, civility, firstname, lastname, email, city, postal_code, date_of_birth FROM private."user" WHERE id = $1 `,
        [id],
      );
      if (result.rows.length === 0) {
        return null;
      }
      return new User(result.rows[0]);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getByEmail(email) {
    try {
      const { rows } = await client.query(
        `SELECT * FROM private."user" where email= $1`,
        [email],
      );

      if (rows.length === 0) return null;

      return new User(rows[0]);
    } catch (error) {
      throw new Error(error);
    }
  }

  async create() {
    try {
      const { rows } = await client.query(
        `INSERT INTO private."user" (civility, firstname, lastname, email, password, city, postal_code, date_of_birth) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING civility, firstname, lastname, email, city, postal_code, date_of_birth`,
        [
          this.civility,
          this.firstname,
          this.lastname,
          this.email,
          this.password,
          this.city,
          this.postalCode,
          this.dateOfBirth,
        ],
      );
      return new User(rows[0]);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = User;
