const fs = require("fs");
const Article = require("../models/article");
const cloudinary = require("../services/cloudinaryService");

const articleController = {
  create: async (request, response) => {
    try {
      const { name, description, price, quantity, categoryId } = request.body;

      const { files } = request;

      // Upload the image to Cloudinary
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return result.public_id;
        }),
      );

      files.forEach((file) => {
        fs.unlink(file.path, (err) => {
          if (err) throw err;
          console.log(`Successfully deleted ${file.path}`);
        });
      });

      // Create a new article
      const article = await new Article({
        name,
        description,
        image: uploadedImages,
        price_wt: price,
        quantity,
        category_id: categoryId,
      }).create();
      response.status(201).json(article);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

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
