const express = require('express');
const router = express.Router();
const registerUser = require('../Controllers/registerUser');
const loginUser=require('../Controllers/loginUser');
const {getDashboardData}=require('../Controllers/getDashboardData');
const verifyOtp = require('../Controllers/verifyOtp');


router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/dashboard/:email',getDashboardData);
router.post('/verify-otp',verifyOtp);

module.exports = router;
