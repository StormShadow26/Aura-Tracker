
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroPage from './components/HeroPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Assignment from './components/Assignment';
import Project from './components/Project';


import VerifyOtp from './components/VerifyOtp';
import { useState } from 'react';
import Timetable from './components/TimeTable';
import BuildProfile from './components/BuildProfile';
import StudyMaterials from './components/StudyMaterials';
import Details from './components/Details';
import Leaderboard from './components/Leaderboard'
import QuizPage from './components/QuizPage';
import Room from  './components/Room';
import VideoCall from './components/VideoCall'


function App() {
  const [email, setEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistrationSuccess = (userEmail) => {
    console.log("Registered Email(in app.js):", userEmail);
    setEmail(userEmail);
    setIsRegistered(true);
  };
  return (

    <Router>
        <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register onSuccess={handleRegistrationSuccess} />} />
        <Route path='/verify-otp' element={<VerifyOtp email={email}></VerifyOtp>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assignments/:email" element={<Assignment/>} />
        <Route path="/projects/:email" element={<Project/>} />
        <Route path="/timetable/:email" element={<Timetable/>} />
        <Route path="/profile" element={<BuildProfile/>} />
        <Route path="/studymaterials" element={<StudyMaterials/>} />
        <Route path="/details" element={<Details email={email}></Details>}></Route>
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="/quiz" element={<QuizPage/>} />
        <Route path="/room" element={<Room/>} />
        <Route path="/room/:roomId" element={<VideoCall/>} />

        

        </Routes>
        
    </Router>
  
    
    
    
    
  );
}

export default App;
