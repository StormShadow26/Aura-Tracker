const express = require('express');
const router = express.Router();
const registerUser = require('../Controllers/registerUser');
const loginUser=require('../Controllers/loginUser');


router.post('/register', registerUser);
router.post('/login',loginUser);

module.exports = router;
