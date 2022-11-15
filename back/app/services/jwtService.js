const jwt = require("jsonwebtoken");

// Service to validate or generateToken a json web token
const jwtService = {
  generateToken: async (payload, refresh = false) => {
    try {
      const expiresIn = refresh
        ? process.env.JWT_SECRET_REFRESH_DURATION
        : process.env.JWT_SECRET_DURATION;

      const token = jwt.sign(
        payload,
        refresh
          ? process.env.JWT_REFRESH_TOKEN_SECRET
          : process.env.JWT_ACCESS_TOKEN_SECRET,
        {
          expiresIn,
        },
      );
      return token;
    } catch (error) {
      return error;
    }
  },

  validateToken: async (token, isRefresh = false) => {
    try {
      const decoded = jwt.verify(
        token,
        isRefresh
          ? process.env.JWT_REFRESH_TOKEN_SECRET
          : process.env.JWT_ACCESS_TOKEN_SECRET,
      );
      return decoded;
    } catch (error) {
      return null;
    }
  },
};

module.exports = jwtService;
