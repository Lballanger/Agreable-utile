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
            temporary_user_id,
            user_id,
            order_id
        ) VALUES ($1, $2 , $3, $4 , $5, $6, $7, $8, $9) RETURNING *`,
        [
          this.cost,
          this.currency,
          this.payment_id,
          this.payment_organisation,
          this.payment_method,
          this.payment_status,
          this.temporary_user_id,
          this.user_id,
          this.order_id,
        ],
      );
      return new Payment(rows[0]);
    } catch (error) {
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  static async findAllPayments({
    page = 1,
    pageSize = 20,
    sort = null,
    search = "",
  }) {
    try {
      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        return {
          field: sortParsed.field,
          sort: sortParsed.sort === "asc" ? "ASC" : "DESC",
        };
      };

      const sortFormatted = sort ? generateSort() : {};

      const orderBy = sortFormatted.field
        ? `ORDER BY ${sortFormatted.field} ${sortFormatted.sort}`
        : "";

      const query = `
      SELECT *
      FROM private.payment
      WHERE 
      UPPER(cost::text) 
      LIKE UPPER($1) 
      OR 
      UPPER(user_id::text) 
      LIKE UPPER($1)
      OR 
      UPPER(currency::text) 
      LIKE UPPER($1)
      OR 
      UPPER(payment_id::text) 
      LIKE UPPER($1)
      OR 
      UPPER(payment_organisation::text) 
      LIKE UPPER($1)
      OR 
      UPPER(payment_method::text) 
      LIKE UPPER($1)
      OR 
      UPPER(payment_status::text) 
      LIKE UPPER($1)
      OR 
      UPPER(temporary_user_id::text) 
      LIKE UPPER($1)
      OR 
      UPPER(order_id::text) 
      LIKE UPPER($1)
      ${orderBy}
      LIMIT $2
      OFFSET $3
    `;
      const values = [`%${search}%`, pageSize, page * pageSize];

      const { rows } = await client.query(query, values);

      const total = await client.query(
        `SELECT COUNT(*)
        FROM private.payment
        WHERE UPPER(cost::text) LIKE $1 OR UPPER(user_id::text) LIKE $1`,
        [`%${search}%`],
      );

      return {
        transactions: rows,
        total: total.rows[0].count,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Payment;
