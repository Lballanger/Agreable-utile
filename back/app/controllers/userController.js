const User = require("../models/user");

const userController = {
  user: async (request, response) => {
    const { id } = request.user;

    try {
      const user = await User.getById(id);

      if (!user) return response.status(404).json("User not found");
      return response.json({
        id: user.id,
        civility: user.civility,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        date_of_birth: user.date_of_birth,
        addresses: user.address,
      });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
};

module.exports = userController;
