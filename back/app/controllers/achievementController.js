const Achievement = require('../models/achievement');

const achievementController = {
  findAll: async (request, response) => {
    try {
      const achievements = await Achievement.findAll();
      response.status(200).json(achievements);
    } catch (error) {
      response.status(500).json(error.message);
    }
  },

  findOneById: async (request, response) => {
    try {
      const id = parseInt(request.params.id, 10);
      const achievement = await Achievement.findOneById(id);
      response.status(200).json(achievement);
    } catch (error) {
      response.status(500).json(error.message);
    }
  },
};

module.exports = achievementController;
