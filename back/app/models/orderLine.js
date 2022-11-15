/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const client = require("../database");

class OrderLine {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  async create() {
    const createdOrder = await client.query(
      'INSERT INTO private."order_line" ("quantity", "order_id", "article_id") VALUES($1, $2, $3) RETURNING *',
      [this.quantity, this.order_id, this.article_id],
    );
    return createdOrder.rows[0];
  }
}

module.exports = OrderLine;
