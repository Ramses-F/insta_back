const express = require('express');
const router = express.Router();
const Admin = require('../controller/login');
const User = require('../controller/user');

// Define the routes
//router.post('/login', Admin.Login);
router.post('/UserTest', User.UserRegister);
router.post('/loginTest', User.UserLogin);
module.exports = router;