const express = require('express');
const router = express.Router();
const {Register,Login} = require('../controller/User');

router.post('/register',Register);
router.post('/login',Login);

module.exports = router