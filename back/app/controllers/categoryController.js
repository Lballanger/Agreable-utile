const Category = require("../models/category");

const articleController = {
  create: async (request, response) => {
    try {
      const { name } = request.body;

      const category = await Category.create(name);

      response.status(201).json(category);
    } catch (error) {
      response.status(500).json(error.message);
    }
  },

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
