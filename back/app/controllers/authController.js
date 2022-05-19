const User = require('../models/user');
const jwtService = require('../services/jwtService');

const authController = {
  login: async (request, response) => {
    const { email, password } = request.body;

    try {
      const user = await User.getByEmail(email);

      if (!user) return response.status(400).json('Invalid credentials');
      if (password !== user.password) {
        return response.status(400).json('Invalid credentials');
      }

      delete user.password;
      delete user.email_verified_at;

      const accessToken = await jwtService.generateToken({ id: user.id });
      const refreshToken = await jwtService.generateToken(
        { id: user.id },
        true,
      );

      return response.json({
        ...user,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
};

module.exports = authController;
