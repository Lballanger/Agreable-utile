const Category = require("../models/category");

const articleController = {
  create: async (request, response) => {
    try {
      const { name } = request.body;

      const categoryAlreadyExists = await Category.findByName(name);

      if (categoryAlreadyExists) {
        return response.status(409).json("Category already exists");
      }

      const category = await Category.create(name);

      return response.status(201).json(category);
    } catch (error) {
      return response.status(500).json(error.message);
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

  findOneById: async (request, response) => {
    try {
      const { id } = request.params;
      const category = await Category.findOneById(id);
      response.status(200).json(category);
    } catch (error) {
      response.status(500).json(error.message);
    }
  },
};

module.exports = articleController;
