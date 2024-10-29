const express = require('express');
const router = express.Router();
const registerUser = require('../Controllers/registerUser');
const loginUser=require('../Controllers/loginUser');
const {getDashboardData}=require('../Controllers/getDashboardData');
const verifyOtp = require('../Controllers/verifyOtp');
const {addAssignment} =require('../Controllers/addAssignment')
const {getAssignmentsByEmail} =require('../Controllers/getAssignmentsByEmail')

router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/dashboard/:email',getDashboardData);
router.post('/verify-otp',verifyOtp);
router.post('/assignment',addAssignment )
router.get('/assignment/:email',getAssignmentsByEmail)

module.exports = router;
