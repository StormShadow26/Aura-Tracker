import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroPage from "./components/HeroPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Assignment from "./components/Assignment";
import Project from "./components/Project";
import VerifyOtp from "./components/VerifyOtp";
import { useState } from "react";
import Timetable from "./components/TimeTable";
import BuildProfile from "./components/BuildProfile";
import StudyMaterials from "./components/StudyMaterials";
import Details from "./components/Details";
import Leaderboard from "./components/Leaderboard";
import QuizPage from "./components/QuizPage";
import Room from "./components/Room";
import VideoCall from "./components/VideoCall";
import Mentors from "./components/Mentors";
import ChallengeForm from "./components/ChallengeForm";
import CodeEditor from "./components/CodeEditor";
import QuestionList from "./components/QuestionList";
import QuestionDetail from "./components/QuestionDetails";
import PomodoroPage from "./components/PomodoroPage";
import ProffDashBoard from "./proffcomponents/ProffDashBoard";
import AllContest from "./components/AllContest";
import ContestDetails from "./components/ContestDetails";
import ContestQuestionPage from "./components/ContestQuestionPage";
import Friends from "./components/Friends";
import ProffAddAssign from './proffcomponents/ProffAddAssign';
import ProffTimeTable from './proffcomponents/ProffTimeTable';
import ProffExam from './proffcomponents/ProffExam'
import ProffAddProjects from './proffcomponents/ProffAddProjects'
import Exam from './components/Exam'
import Attendance from  './components/Attendance'
import CgTracker from './components/CgTracker'
import Analytics from './components/Analytics';

const pageTransition = {
  initial: { opacity: 0, x: 200, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -200, scale: 0.95 },
  transition: { duration: 0.7, ease: "easeInOut" },
};

function App() {
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistrationSuccess = (userEmail) => {
    console.log("Registered Email(in app.js):", userEmail);
    setEmail(userEmail);
    setIsRegistered(true);
  };

  const handleChallengeCreate = async (challengeData) => {
    await fetch("http://localhost:4000/api/v1/challenges/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(challengeData),
    });
  };

  return (
    <Router>
      <AnimatePresence>
        <Routes>
          <Route
            path="/"
            element={
              <motion.div {...pageTransition}>
                <HeroPage />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div {...pageTransition}>
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div {...pageTransition}>
                <Register onSuccess={handleRegistrationSuccess} />
              </motion.div>
            }
          />
          <Route
            path="/verify-otp"
            element={
              <motion.div {...pageTransition}>
                <VerifyOtp email={email} />
              </motion.div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <motion.div {...pageTransition}>
                <Dashboard email={email} />
              </motion.div>
            }
          />
          <Route
            path="/assignments/:email"
            element={
              <motion.div {...pageTransition}>
                <Assignment />
              </motion.div>
            }
          />
          <Route
            path="/projects/:email"
            element={
              <motion.div {...pageTransition}>
                <Project />
              </motion.div>
            }
          />
          <Route
            path="/timetable/:email"
            element={
              <motion.div {...pageTransition}>
                <Timetable />
              </motion.div>
            }
          />
          <Route
            path="/profile"
            element={
              <motion.div {...pageTransition}>
                <BuildProfile />
              </motion.div>
            }
          />
          <Route
            path="/studymaterials"
            element={
              <motion.div {...pageTransition}>
                <StudyMaterials />
              </motion.div>
            }
          />
          <Route
            path="/details"
            element={
              <motion.div {...pageTransition}>
                <Details email={email} />
              </motion.div>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <motion.div {...pageTransition}>
                <Leaderboard />
              </motion.div>
            }
          />
          <Route
            path="/quiz"
            element={
              <motion.div {...pageTransition}>
                <QuizPage />
              </motion.div>
            }
          />
          <Route
            path="/room"
            element={
              <motion.div {...pageTransition}>
                <Room />
              </motion.div>
            }
          />
          <Route
            path="/room/:roomId"
            element={
              <motion.div {...pageTransition}>
                <VideoCall />
              </motion.div>
            }
          />
          <Route
            path="/mentors"
            element={
              <motion.div {...pageTransition}>
                <Mentors />
              </motion.div>
            }
          />
          <Route
            path="/coder"
            element={
              <motion.div {...pageTransition}>
                <CodeEditor />
              </motion.div>
            }
          />
          <Route
            path="/question/:id"
            element={
              <motion.div {...pageTransition}>
                <QuestionDetail />
              </motion.div>
            }
          />
          <Route
            path="/question"
            element={
              <motion.div {...pageTransition}>
                <QuestionList />
              </motion.div>
            }
          />
          <Route
            path="/pd"
            element={
              <motion.div {...pageTransition}>
                <PomodoroPage />
              </motion.div>
            }
          />
          <Route
            path="/contest"
            element={
              <motion.div {...pageTransition}>
                <AllContest />
              </motion.div>
            }
          />
          <Route
            path="/contest/:contestId"
            element={
              <motion.div {...pageTransition}>
                <ContestDetails />
              </motion.div>
            }
          />
          <Route
            path="/contest/:contestId/:id"
            element={
              <motion.div {...pageTransition}>
                <ContestQuestionPage />
              </motion.div>
            }
          />
          <Route
            path="/classDashBoard"
            element={
              <motion.div {...pageTransition}>
                <ProffDashBoard />
              </motion.div>
            }
          />
          <Route
            path="/friends"
            element={
              <motion.div {...pageTransition}>
                <Friends />
              </motion.div>
            }
          />
          <Route path="/proffaddassign" element={<ProffAddAssign />} />
          <Route path="/ProffTimeTable" element={<ProffTimeTable />} />
          <Route path="/ProffExam" element={<ProffExam />} />
          <Route path="/ProffAddProjects" element={<ProffAddProjects />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/attendance/:email" element={<Attendance />} />
          <Route path="/Goals" element={<CgTracker />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
