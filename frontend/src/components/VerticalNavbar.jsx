
import React, { useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import { useNavigate } from 'react-router-dom';
import './VerticalNavbar.css'; 

const VerticalNavbar = () => {
  const navigate = useNavigate();
  const { email } = useContext(EmailContext); 
  console.log(email, "= navbar wala");


  const handleDashboard = () => navigate(`/dashboard?email=${encodeURIComponent(email)}`);
  const handleAttendance = () => navigate(`/attendance?email=${encodeURIComponent(email)}`);
  const handleAssignments = () => navigate(`/assignments/${encodeURIComponent(email)}`);
  const handleProjects = () => navigate(`/projects/${encodeURIComponent(email)}`);
  const handleTimetable = () => navigate(`/timetable/${encodeURIComponent(email)}`);
  const handleProblemset=()=>navigate('/question');
  const handlePomodoro=()=>navigate('/pd');
  const handleContest=()=>navigate('/contest')
  const handleExam=()=>navigate('/exam')
  

  return (
    <div id="vertical-navbar4" className="navbar-container4">
      {/* <button id="dashboard-button" onClick={handleDashboard} className="navbar-button">Dashboard</button> */}
      <button id="attendance-button4" onClick={handleAttendance} className="navbar-button4">Attendance</button>
      <button id="assignments-button4" onClick={handleAssignments} className="navbar-button4">Assignments</button>
      <button id="projects-button4" onClick={handleProjects} className="navbar-button4">Projects</button>
      <button id="timetable-button4" onClick={handleTimetable} className="navbar-button4">Timetable</button>
      <button  onClick={handleExam} className="navbar-button4">Exam</button>
      <button onClick={handleProblemset} className="navbar-button4">Problemset</button>
      <button  onClick={handlePomodoro} className="navbar-button4">Need To Focus?</button>
      <button  onClick={handleContest} className="navbar-button4">Contest</button>

      
    </div>
  );
};

export default VerticalNavbar;
