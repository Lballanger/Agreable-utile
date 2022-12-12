/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const client = require("../database");

class Order {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  async create() {
    const createdOrder = await client.query(
      `INSERT INTO private."order" ("user_id", "order_number", "status") 
       VALUES ($1, $2, $3)
       RETURNING *`,
      [this.user_id, this.order_number, this.status],
    );
    return createdOrder.rows[0];
  }

  static async findByUserId(id) {
    try {
      const { rows } = await client.query(
        `WITH order_line AS (
              SELECT 
                order_id,
                article_id
              FROM private.order_line
              GROUP BY order_id, article_id	
	        )
          SELECT
            private.order.order_number, private.order.created_at, private.order.status,
            json_agg(private.article.*) AS articles
          FROM private.order
          LEFT JOIN order_line
            ON private.order.id = order_line.order_id
          JOIN private.article ON order_line.article_id=article.id	
          WHERE private.order.user_id =$1
          GROUP BY private.order.id
          ORDER BY "order".created_at DESC;`,
        [id],
      );
      return rows.map((order) => new Order(order));
    } catch (error) {
      return new Error(error.detail ? error.detail : error.message);
    }
  }

  static async getByOrderNumber(orderNumber) {
    try {
      const { rows } = await client.query(
        `SELECT * FROM private."order" WHERE order_number= $1`,
        [orderNumber],
      );

      if (rows.length === 0) return null;

      return new Order(rows[0]);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update() {
    const updateOrder = await client.query(
      `UPDATE private."order" SET status = $1 WHERE order_number = $2`,
      [this.status, this.order_number],
    );
    return updateOrder.rows[0];
  }
}

module.exports = Order;
