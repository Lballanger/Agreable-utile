require('dotenv').config();
const jwt = require('jsonwebtoken');

// Service to validate or generateToken a json web token
const jwtService = {
  generateToken: async (payload) => {
    try {
      const expiresIn = parseInt(process.env.SECRET_DURATION, 10);

      const result = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn,
      });

      return result;
    } catch (error) {
      return error;
    }
  },
};

module.exports = jwtService;
