/* eslint-disable import/no-unresolved */
/* eslint-disable no-return-await */
const bcrypt = require("bcrypt");

exports.hash = async (password) => await bcrypt.hash(password, 10);
exports.compare = async (password, hash) =>
  await bcrypt.compare(password, hash);
