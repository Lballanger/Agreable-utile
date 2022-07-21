const User = require("../models/user");
const jwtService = require("../services/jwtService");

const authController = {
  login: async (request, response) => {
    const { email, password } = request.body;

    try {
      const user = await User.getByEmail(email);

      if (!user) return response.status(400).json("Invalid credentials");
      if (password !== user.password) {
        return response.status(400).json("Invalid credentials");
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

  register: async (request, response) => {
    try {
      const {
        civility,
        firstname,
        lastname,
        email,
        password,
        city,
        postalCode,
        dateOfBirth,
      } = request.body;

      const existingUser = await User.getByEmail(email);

      if (existingUser) return response.status(400).json("User already exists");

      const user = await new User({
        civility,
        firstname,
        lastname,
        email,
        password,
        city,
        postalCode,
        dateOfBirth,
      }).create();

      const accessToken = await jwtService.generateToken({ id: user.id });
      const refreshToken = await jwtService.generateToken(
        { id: user.id },
        true,
      );

      return response.json({
        id: user.id,
        civility: user.civility,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        city: user.city,
        postalCode: user.postal_code,
        dateOfBirth: user.date_of_birth,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },

  refreshToken: async (request, response) => {
    const { id } = request.user;
    try {
      const newToken = await jwtService.generateToken({ id });
      return response.json({ accessToken: newToken });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
};

module.exports = authController;
