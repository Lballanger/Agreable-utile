require("dotenv").config();

const { Pool } = require("pg");

const config = {
  connectionString:
    process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_DATABASE_URL
      : process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === "production") {
  config.ssl = {
    rejectUnauthorized: false,
  };
}

const pool = new Pool(config);

module.exports = pool;
