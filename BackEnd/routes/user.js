const express = require('express');
const router = express.Router();
const registerUser = require('../Controllers/registerUser');
const loginUser=require('../Controllers/loginUser');
const {getDashboardData}=require('../Controllers/getDashboardData');
const verifyOtp = require('../Controllers/verifyOtp');
const {addAssignment} =require('../Controllers/addAssignment')
const {getAssignmentsByEmail} =require('../Controllers/getAssignmentsByEmail')
const {submitAssignment}=require('../Controllers/submitAssignment');

const {addProject} =require('../Controllers/addProject')
const {getProjectsByEmail} =require('../Controllers/getProjectsByEmail')
const {submitProject}=require('../Controllers/submitProject')

router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/dashboard/:email',getDashboardData);
router.post('/verify-otp',verifyOtp);
router.post('/assignment',addAssignment )
router.get('/assignment/:email',getAssignmentsByEmail);
router.post('/submit', submitAssignment)

// project wala
router.post('/project',addProject)
router.get('/project/:email',getProjectsByEmail);
router.post('/submitproject', submitProject);


module.exports = router;
