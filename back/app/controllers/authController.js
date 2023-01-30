const User = require("../models/user");
const jwtService = require("../services/jwtService");
const { compare, hash } = require("../services/bcryptService");
const mailer = require("../services/nodemailer");

const authController = {
  login: async (request, response) => {
    const { email, password } = request.body;

    try {
      const user = await User.getByEmail(email);
      if (!user) return response.status(400).json("Invalid credentials");
      if (!(await compare(password, user.password))) {
        return response.status(400).json("Invalid credentials");
      }

      delete user.password;
      delete user.email_verified_at;

      const accessToken = await jwtService.generateToken({
        id: user.id,
        role: user.role,
      });

      const refreshToken = await jwtService.generateToken(
        { id: user.id, role: user.role },
        true,
      );

      return response.json({
        id: user.id,
        civility: user.civility,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        date_of_birth: user.date_of_birth,
        addresses: user.address,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },

  adminLogin: async (request, response) => {
    const { email, password } = request.body;

    try {
      const user = await User.getByEmail(email);
      if (!user) return response.status(400).json("Invalid credentials");
      if (!(await compare(password, user.password))) {
        return response.status(400).json("Invalid credentials");
      }
      if (user.role !== "admin") {
        return response.status(400).json("Invalid credentials");
      }

      delete user.password;
      delete user.email_verified_at;

      const accessToken = await jwtService.generateToken({
        id: user.id,
        role: user.role,
      });

      const refreshToken = await jwtService.generateToken(
        { id: user.id, role: user.role },
        true,
      );

      return response.json({
        id: user.id,
        civility: user.civility,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        date_of_birth: user.date_of_birth,
        addresses: user.address,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },

  register: async (request, response) => {
    try {
      const { civility, firstname, lastname, email, password } = request.body;

      const user = await User.getByEmail(email);

      if (user) return response.status(400).json("User already exists");

      const hashedPassword = await hash(password);

      const newUser = await new User({
        civility,
        firstname,
        lastname,
        email,
        password: hashedPassword,
      }).create();

      const accessToken = await jwtService.generateToken({
        id: newUser.id,
        role: newUser.role,
      });
      const refreshToken = await jwtService.generateToken(
        { id: newUser.id, role: newUser.role },
        true,
      );

      // Send the mail
      const params = {
        sender: "lballanger.dev@gmail.com",
        type: "registred",
        username: newUser.firstname,
        urlLink: "",
        revokeLink: null,
        subject: null,
      };
      await mailer(params);

      return response.json({
        id: newUser.id,
        civility: newUser.civility,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json(error.message);
    }
  },

  refreshToken: async (request, response) => {
    const { id } = request.user;
    try {
      const user = await User.getById(id);
      const newToken = await jwtService.generateToken({ id, role: user.role });
      return response.json({ accessToken: newToken });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
};

module.exports = authController;
