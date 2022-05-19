require('dotenv').config();
const jwt = require('jsonwebtoken');

// Service to validate or generateToken a json web token
const jwtService = {
  generateToken: async (payload) => {
    try {
      const expiresIn = parseInt(process.env.JWT_SECRET_DURATION, 10);

      const result = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn,
      });

      return result;
    } catch (error) {
      return error;
    }
  },
};

module.exports = jwtService;
