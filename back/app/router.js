const { Router } = require('express');

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

const router = Router();

router.get('/api/user', userController.user);
router.post('/api/auth/login', authController.login);

module.exports = router;
