const { Router } = require('express');

const router = Router();

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

/** ********************** USER *********************** */
router.get('/api/user', userController.user);

/** ********************** AUTH *********************** */
router.post('/api/auth/login', authController.login);
router.post('/api/auth/refresh-token', authController.refreshToken);

module.exports = router;
