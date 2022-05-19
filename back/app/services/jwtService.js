require('dotenv').config();
const jwt = require('jsonwebtoken');

// Service to validate or generateToken a json web token
const jwtService = {
  generateToken: async (payload, refresh = false) => {
    try {
      const expiresIn = refresh
        ? parseInt(process.env.JWT_SECRET_DURATION, 10)
        : process.env.JWT_SECRET_REFRESH_DURATION;

      const token = jwt.sign(
        payload,
        refresh
          ? process.env.JWT_ACCESS_TOKEN_SECRET
          : process.env.JWT_REFRESH_TOKEN_SECRET,
        {
          expiresIn,
        },
      );

      return token;
    } catch (error) {
      return error;
    }
  },
};

module.exports = jwtService;
