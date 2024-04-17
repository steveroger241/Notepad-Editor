const express = require('express');
const router = express.Router();
const { userController } = require('../controller/authController.js');

router.post('/signup', userController);

module.exports = router;