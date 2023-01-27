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
const paymentController = require("./controllers/paymentController");
const statsController = require("./controllers/statsController");

/** ********************** USER *********************** */
router.get("/api/user", authMiddleware(), userController.user);
router.get("/api/users", authAndAdminMiddleware(), userController.findAllUsers);
router.put("/api/user", authAndAdminMiddleware(), userController.update);

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
router.patch(
  "/api/article/:id",
  authMiddleware(),
  articleController.updateById,
);
router.post(
  "/api/article",
  authAndAdminMiddleware(),
  multerMiddleware.array("img", 5),
  articleController.create,
);

/** ********************** CATEGORIES *********************** */

router.get("/api/categories", categoryController.findAll);
router.post(
  "/api/category",
  authAndAdminMiddleware(),
  categoryController.create,
);

/** ********************** ORDER *********************** */

router.post("/api/order", orderController.create);
router.get("/api/orders", authMiddleware(), orderController.findByUserId);

/** ********************** PAYMENT *********************** */

router.get(
  "/api/payments",
  authAndAdminMiddleware(),
  paymentController.findAllPayments,
);

/** ********************** STRIPE *********************** */

router.post("/api/payment", stripeController.payment);

// Hook for stripe
router.post(
  "/api/webhook",
  raw({ type: "application/json" }),
  stripeController.stripeWebHooks,
);

/** ********************** ACHIEVEMENT *********************** */

router.get("/api/achievements", achievementController.findAll);
router.get("/api/achievement/:id", achievementController.findOneById);

/** ********************** ADMIN *********************** */

// Stats

router.get(
  "/api/stats/dashboard",
  authAndAdminMiddleware(),
  statsController.getDashboardData,
);

router.get(
  "/api/stats/total-customers",
  authAndAdminMiddleware(),
  statsController.getTotalCustomers,
);
router.get(
  "/api/stats/yearly",
  authAndAdminMiddleware(),
  statsController.getYearlyData,
);
router.get(
  "/api/stats/monthly",
  authAndAdminMiddleware(),
  statsController.getMonthlyData,
);
router.get(
  "/api/stats/daily",
  authAndAdminMiddleware(),
  statsController.getDailyData,
);
router.get(
  "/api/stats/categorys",
  authAndAdminMiddleware(),
  statsController.getTotalSalesPerCategory,
);

router.get(
  "/api/stats/sales",
  authAndAdminMiddleware(),
  statsController.getAllSales,
);

module.exports = router;
