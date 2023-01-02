const { Router, raw } = require("express");
const multerMiddleware = require("./middlewares/multer");
const {
  authMiddleware,
  authAndAdminMiddleware,
} = require("./middlewares/authMiddleware");

const router = Router();

const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const articleController = require("./controllers/articleController");
const categoryController = require("./controllers/categoryController");
const achievementController = require("./controllers/achievementController");
const addressController = require("./controllers/addressController");
const stripeController = require("./controllers/stripeController");
const orderController = require("./controllers/orderController");
const guestController = require("./controllers/guestController");
const adminController = require("./controllers/adminController");

/** ********************** USER *********************** */
router.get("/api/user", authMiddleware(), userController.user);
router.get("/api/users", authAndAdminMiddleware(), userController.findAllUsers);

/** ********************** GUEST *********************** */
router.post("/api/guest", guestController.create);

/** ********************* ADDRESS ********************* */
router.post("/api/address", authMiddleware(), addressController.create);
router.get("/api/address", authMiddleware(), addressController.findByUserId);

/** ********************** AUTH *********************** */
router.post("/api/auth/register", authController.register);
router.post("/api/auth/login", authController.login);
router.post(
  "/api/auth/refresh-token",
  authMiddleware(true),
  authController.refreshToken,
);

/** ********************** ARTICLE *********************** */

router.get("/api/articles", articleController.findAll);
router.get("/api/article/:id", articleController.findOneById);

/** ********************** CATEGORIES *********************** */

router.get("/api/categories", categoryController.findAll);

/** ********************** ORDER *********************** */

router.post("/api/order", orderController.create);
router.get("/api/orders", authMiddleware(), orderController.findByUserId);

/** ********************** STRIPE *********************** */

router.post("/api/payment", stripeController.payment);
router.post(
  "/api/webhook",
  raw({ type: "application/json" }),
  stripeController.stripeWebHooks,
);

/** ********************** ACHIEVEMENT *********************** */

router.get("/api/achievements", achievementController.findAll);
router.get("/api/achievement/:id", achievementController.findOneById);

/** ********************** ADMIN *********************** */

router.post(
  "/api/admin/image",
  authMiddleware(),
  multerMiddleware.single("file"),
  adminController.uploadImage,
);

module.exports = router;
