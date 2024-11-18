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
// const {updateTimetable}=require('../Controllers/updateTimetable');
// const {getTimeTable}=require('../Controllers/TimeTableController.js')
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
const {createOrUpdateTimetable,updateDaySchedule,getTt}=require('../Controllers/TimeTableController.js')
const {addTimetable,getTimetable}=require('../Controllers/ExamController.js');
const {getUserData}=require('../Controllers/getEntireUser.js')
const {updateProgress}=require('../Controllers/updateProgress.js')
const { updateAttendance } = require('../controllers/attendanceController'); 
const getFriends=require('../Controllers/Friends.js')
const { sendChallengeEmail }=require('../Controllers/challengeController.js')
const addFriend=require('../Controllers/AddFriend.js')
const { searchUsersByName } = require("../Controllers/userController")
// const {searchUserByName}=require('../Controllers/userController.js')


router.post('/welcome', submitUserDetails);
router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/dashboard/:email',getDashboardData);
router.post('/verify-otp',verifyOtp);
router.post('/assignment',addAssignment )
router.get('/assignment/:email',getAssignmentsByEmail);
router.post('/submit', submitAssignment)
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
router.put('/updateDaySchedule/:semester/:branch/:day',updateDaySchedule);
router.post('/createOrUpdateTimetable',createOrUpdateTimetable);
router.post('/addTimetable',addTimetable);
router.get('/getTimetable',getTimetable);
router.get('/getTt/:semester/:branch',getTt);
router.get('/getUserData/:email',getUserData);
router.post('/updateProgress',updateProgress)
router.post('/update-attendance', updateAttendance);
router.post('/add-friend',addFriend);
router.get('/friends',getFriends);
router.post("/challenge", sendChallengeEmail);

router.get('/users',searchUsersByName);

module.exports = router;