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
const {updateTimetable}=require('../Controllers/updateTimetable');
const {getTimeTable}=require('../Controllers/getTimeTable')
const {updateProfile}=require('../Controllers/updateProfile')
const {addSyllabus}=require('../Controllers/addSyllabus');
const syllabusController = require('../Controllers/syllabusController');
const {addMentor}=require('../Controllers/addMentor');
const {getMentors}=require('../Controllers/getMentors')
const {compileCode}=require('../Controllers/compilerController.js');
const submitUserDetails=require("../Controllers/SubmitUserDetails");
const {addQuestion}=require("../Controllers/addQuestion.js");
const getQuestion = require('../Controllers/getQuestions.js');
const { createContest, getContests } = require('../controllers/contestController'); 
const {  getContestById } = require('../controllers/contestController');
const { addSolvedBy}=require('../Controllers/addSolvedBy.js');
const {addAssignmentProff}=require('../Controllers/addAssignmentProff.js');
router.post('/welcome', submitUserDetails);
const {incrementAuraPoints}=require('../Controllers/incrementAuraPoints')
const {getLeaderboard}=require('../Controllers/getLeaderboard')

router.post('/welcome', submitUserDetails);
router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/dashboard/:email',getDashboardData);
router.post('/verify-otp',verifyOtp);
router.post('/assignment',addAssignment )
router.get('/assignment/:email',getAssignmentsByEmail);
router.post('/submit', submitAssignment)
router.put('/timetable/:email',updateTimetable);
router.get('/gettimetable/:email',getTimeTable);
router.put('/profile/:email', updateProfile);
router.post('/project',addProject)
router.get('/project/:email',getProjectsByEmail);
router.post('/submitproject', submitProject);
router.post('/syllabus',addSyllabus);
router.post('/increment-aura-points', incrementAuraPoints);
router.use('/api', syllabusController);
router.get('/leaderboard',getLeaderboard);
router.post('/addMentor',addMentor);
router.get('/getMentors',getMentors);
router.post("/compile", compileCode);
router.post("/addquest",addQuestion);
router.get('/getquest', getQuestion.getAllQuestions);
router.get('/getquest/:id', getQuestion.getQuestionById);
router.post('/createcontest', createContest);
router.get('/getcontests', getContests);
router.get('/getcontests/:id', getContestById);
router.put('/updatequestion/:id', addSolvedBy);
router.post('/addAssignmentProff',addAssignmentProff)

module.exports = router;
