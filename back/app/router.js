const { Router } = require('express');

const userController = require('./controllers/userController');

const router = Router();

router.get('/api/user', userController.user);

module.exports = router;
