const fs = require("fs");
const cloudinary = require("../services/cloudinaryService");
// const Admin = require("../models/admin");

const adminController = {
  uploadImage: async (req, res) => {
    try {
      const { file } = req;
      const result = await cloudinary.uploader.upload(file.path);

      // Deleting the image after processing
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        }
      });
      res.status(200).json({ image: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = adminController;
