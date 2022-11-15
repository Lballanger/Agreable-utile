const Category = require("../models/category");

const articleController = {
  findAll: async (request, response) => {
    try {
      const categories = await Category.findAll();
      response.status(200).json(categories);
    } catch (error) {
      response.status(500).json(error.message);
    }
  },
};

module.exports = articleController;
