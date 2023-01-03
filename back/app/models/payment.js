const client = require("../database");

class Payment {
  /* eslint-disable guard-for-in */
  /* eslint-disable no-restricted-syntax */
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  async create() {
    try {
      const { rows } = await client.query(
        `INSERT INTO private.payment (
            cost,
            currency,
            payment_id,
            payment_organisation,
            payment_method,
            payment_status,
            order_id
        ) VALUES ($1, $2 , $3, $4 , $5, $6, $7) RETURNING *`,
        [
          this.cost,
          this.currency,
          this.payment_id,
          this.payment_organisation,
          this.payment_method,
          this.payment_status,
          this.order_id,
        ],
      );
      return new Payment(rows[0]);
    } catch (error) {
      throw new Error(error.detail ? error.detail : error.message);
    }
  }
}

module.exports = Payment;
