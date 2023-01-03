/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const client = require("../database");

class User {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async getById(id) {
    try {
      const result = await client.query(
        `SELECT r.id, r.civility, r.firstname, r.lastname, r.email, r.date_of_birth, r.role, array_to_json(array_remove(array_agg(address.*), NULL)) AS address FROM private."user" AS r LEFT JOIN private.address ON r.id=address.user_id WHERE r.id = $1 GROUP BY r.id;`,
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

  static async getAlreadyRegistred(email) {
    try {
      const { rows } = await client.query(
        `SELECT r.*, array_to_json(array_remove(array_agg(address.*), NULL)) AS address FROM private."user" AS r LEFT JOIN private.address ON r.id=address.user_id WHERE r.email=$1 AND registred=true GROUP BY r.id;`,
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
        `INSERT INTO private."user" (civility, firstname, lastname, email, password) 
      VALUES ($1, $2, $3, $4, $5) RETURNING id, civility, firstname, lastname, email`,
        [
          this.civility,
          this.firstname,
          this.lastname,
          this.email,
          this.password,
        ],
      );
      return new User(rows[0]);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAll() {
    try {
      const { rows } = await client.query(`SELECT * FROM private."user"`);
      return rows.map((row) => new User(row));
    } catch (error) {
      throw new Error(error);
    }
  }

  static async update(data) {
    try {
      // pg statement
      const statement = `
      UPDATE private.user  
        SET civility=$2
            email=$3, 
            password=$4, 
            firstname=$5, 
            lastname=$6
            date_of_birth=$7
        WHERE id = $1
        RETURNING *
      `;

      // pg values
      const values = [
        data.id,
        data.civility,
        data.email,
        data.password,
        data.firstname,
        data.lastname,
        data.date_of_birth,
      ];

      // make query
      const result = await client.query(statement, values);

      // check for valid results
      if (result.rows.length === 0) return null;
      return new User(result.rows[0]);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = User;
