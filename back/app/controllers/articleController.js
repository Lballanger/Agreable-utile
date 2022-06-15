const Article = require('../models/article');

const articleController = {
  findAll: async (request, response) => {
    try {
      const articles = await Article.findAll();
      response.status(200).json(articles);
    } catch (error) {
      response.status(500).json(error.message);
    }
  },

  findOneById: async (request, response) => {
    try {
      const id = parseInt(request.params.id, 10);
      const article = await Article.findOneById(id);
      response.status(200).json(article);
    } catch (error) {
      response.status(500).json(error.message);
    }
  },
};

module.exports = articleController;
