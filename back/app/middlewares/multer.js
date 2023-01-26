const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Définissez le répertoire de destination pour les fichiers
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // Définissez le nom des fichiers en fonction de leur original
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
