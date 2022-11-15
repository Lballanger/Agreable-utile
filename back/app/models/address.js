const client = require("../database");

class Address {
  /* eslint-disable guard-for-in */
  /* eslint-disable no-restricted-syntax */
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async findByUserId(id) {
    try {
      const { rows } = await client.query(
        `SELECT * FROM private.address WHERE user_id=$1`,
        [id],
      );
      return rows.map((address) => new Address(address));
    } catch (error) {
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  async create() {
    try {
      const { rows } = await client.query(
        `INSERT INTO private.address (civility, firstname, lastname, country, address, city, postal_code, additional_info, phone, user_id) VALUES ($1, $2 , $3, $4 , $5, $6, $7, $8, $9, $10) RETURNING *`,
        [
          this.civility,
          this.firstname,
          this.lastname,
          this.country,
          this.address,
          this.city,
          this.postalCode,
          this.additionalInfo,
          this.phone,
          this.userId,
        ],
      );
      return new Address(rows[0]);
    } catch (error) {
      throw new Error(error.detail ? error.detail : error.message);
    }
  }
}

module.exports = Address;
