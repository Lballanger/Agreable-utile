/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const client = require("../database");

class Guest {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  async create() {
    try {
      const { rows } = await client.query(
        `INSERT INTO private."temporary_user" (
                civility,
                firstname,
                lastname,
                email,
                country,
                address,
                city,
                postal_code,
                additional_info,
                phone
            ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
        [
          this.civility,
          this.firstname,
          this.lastname,
          this.email,
          this.country,
          this.address,
          this.city,
          this.postal_code,
          this.additional_info,
          this.phone,
        ],
      );

      return new Guest(rows[0]);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Guest;
