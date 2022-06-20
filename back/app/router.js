const { Router } = require('express');

const router = Router();

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const articleController = require('./controllers/articleController');
const achievementController = require('./controllers/achievementController');

/** ********************** USER *********************** */
router.get('/api/user', userController.user);

/** ********************** AUTH *********************** */
router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);
router.post('/api/auth/refresh-token', authController.refreshToken);

/** ********************** ARTICLE *********************** */

router.get('/api/articles', articleController.findAll);
router.get('/api/article/:id', articleController.findOneById);

/** ********************** ACHIEVEMENT *********************** */

router.get('/api/achievements', achievementController.findAll);
router.get('/api/achievement/:id', achievementController.findOneById);

module.exports = router;
