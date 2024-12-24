const express = require('express');
const router = express.Router();
const Admin = require('../controller/login');

// Define the routes
router.post('/login', Admin.Login);
module.exports = router;