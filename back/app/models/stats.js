const client = require("../database");

class Stats {
  /* eslint-disable guard-for-in */
  /* eslint-disable no-restricted-syntax */
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async totalCustomers() {
    try {
      const { rows } = await client.query(
        `SELECT
          (SELECT COUNT(*) FROM private.user) AS nb_user,
          (SELECT COUNT(*) FROM private.temporary_user) AS nb_temporary_user;`,
      );
      return new Stats(rows[0]);
    } catch (error) {
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  static async yearlyData() {
    try {
      const { rows } = await client.query(
        `SELECT
            date_trunc('month', "order".created_at) as month,
          SUM(
            "order_line".quantity * "article".price_wt
          ) as totalSales,
          SUM("order_line".quantity) as totalUnits
        FROM
          private."order"
        INNER JOIN 
          private."order_line" 
        ON 
          "order".id = "order_line".order_id
        INNER JOIN 
          private."article" 
        ON
          "order_line".article_id = "article".id
        WHERE
          private."order".status IN ('Paiement réussi', 'Expédié')
        AND
          private."order".created_at 
        BETWEEN 
          date_trunc('year', NOW()) + '1hour' 
        AND 
          date_trunc('year', NOW()) + INTERVAL '1 year' - INTERVAL '1 day'
        GROUP BY 
          month 
        ORDER BY 
          month ASC;`,
      );

      if (rows.length === 0) return null;

      return rows.map((row) => {
        const rowCopy = { ...row };
        rowCopy.month = rowCopy.month.toLocaleString("fr-FR", {
          timeZone: "Europe/Paris",
        });
        return new Stats(rowCopy);
      });
    } catch (error) {
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  static async monthlyData(startDate, endDate) {
    try {
      const { rows } = await client.query(
        `SELECT
          date_trunc('month', "order".created_at) as month,
          SUM("subquery".total_amount) as totalSales,
          SUM("order_line".quantity) as totalUnits
        FROM (
          SELECT
            "order".id,
            SUM("order_line".quantity * "article".price_wt) as total_amount
          FROM 
            private."order"
          INNER JOIN 
            private."order_line" 
          ON 
            "order".id = "order_line".order_id
          INNER JOIN 
            private."article" 
          ON 
            "order_line".article_id = "article".id
          GROUP BY "order".id
        ) as "subquery"
        INNER JOIN 
          private."order_line" 
        ON 
          "subquery".id = private."order_line".order_id
        INNER JOIN 
          private."order" 
        ON 
          private."order_line".order_id = private."order".id
	      WHERE
		      private."order".status IN ('Paiement réussi', 'Expédié')
	      AND
		      private."order".created_at BETWEEN $1 AND $2
        GROUP BY month ORDER BY month ASC;`,
        [startDate, endDate],
      );

      if (rows.length === 0) return null;

      return rows.map((row) => new Stats(row));
    } catch (error) {
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  static async dailyData(startDate, endDate) {
    try {
      const { rows } = await client.query(
        `SELECT
          date_trunc('day', "order".created_at) as date,
          SUM("order_line".quantity * "article".price_wt)::numeric as totalSales,
        SUM("order_line".quantity)::integer as totalUnits
        FROM private."order"
        INNER JOIN 
          private."order_line" 
        ON 
          "order".id = "order_line".order_id
        INNER JOIN 
          private."article" 
        ON 
          "order_line".article_id = "article".id
        WHERE
          private."order".status IN ('Paiement réussi', 'Expédié')
        AND 
          private."order".created_at 
        BETWEEN 
          $1 
        AND 
          $2
        GROUP BY 
          date ORDER BY date ASC;`,

        [startDate, endDate],
      );

      if (rows.length === 0) return null;

      return rows.map((row) => {
        const rowCopy = { ...row };
        rowCopy.totalsales = parseInt(rowCopy.totalsales, 10);
        rowCopy.totalunits = parseInt(rowCopy.totalunits, 10);
        return new Stats(rowCopy);
      });
    } catch (error) {
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  static async totalSalesPerCategory() {
    try {
      const { rows } = await client.query(
        `SELECT
          "category".name as categoryName,
          SUM("order_line".quantity * "article".price_wt) as totalSales
        FROM
          private."order_line"
        INNER JOIN
          private."article"
        ON
          private."order_line".article_id = "article".id
        INNER JOIN
          private."category"
        ON
          "article".category_id = "category".id
		    INNER JOIN
			    private."order"
		    ON
			    "order_line".order_id = "order".id
		    WHERE
		      "order".status  IN ('Paiement réussi', 'Expédié')
        GROUP BY "category".name
        ORDER BY totalSales DESC;`,
      );

      if (rows.length === 0) return null;

      return rows.map((row) => new Stats(row));
    } catch (error) {
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  static async allSales() {
    try {
      const { rows } = await client.query(
        `SELECT
          SUM("order_line".quantity * "article".price_wt) as totalSales
        FROM
          private."order_line"
        INNER JOIN
          private."article"
        ON
          private."order_line".article_id = "article".id
        INNER JOIN
          private."order"
        ON
          "order_line".order_id = "order".id
        WHERE
          "order".status  IN ('Paiement réussi', 'Expédié');`,
      );

      if (rows.length === 0) return null;

      return rows.map((row) => new Stats(row));
    } catch (error) {
      throw new Error(error.detail ? error.detail : error.message);
    }
  }
}

module.exports = Stats;
