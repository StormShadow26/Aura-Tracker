// src/components/VerticalNavbar.js
import React, { useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import { useNavigate } from 'react-router-dom';
import './VerticalNavbar.css'; // Import the CSS file

const VerticalNavbar = () => {
  const navigate = useNavigate();
  const { email } = useContext(EmailContext); // Get the email from context
  console.log(email, "= navbar wala");

  // Handler functions for navigation
  const handleDashboard = () => navigate(`/dashboard?email=${encodeURIComponent(email)}`);
  const handleAttendance = () => navigate(`/attendance?email=${encodeURIComponent(email)}`);
  const handleAssignments = () => navigate(`/assignments/${encodeURIComponent(email)}`);
  const handleProjects = () => navigate(`/projects/${encodeURIComponent(email)}`);
  const handleTimetable = () => navigate(`/timetable/${encodeURIComponent(email)}`);
  const handleProblemset=()=>navigate('/question');
  

  return (
    <div id="vertical-navbar4" className="navbar-container4">
      {/* <button id="dashboard-button" onClick={handleDashboard} className="navbar-button">Dashboard</button> */}
      <button id="attendance-button4" onClick={handleAttendance} className="navbar-button4">Attendance</button>
      <button id="assignments-button4" onClick={handleAssignments} className="navbar-button4">Assignments</button>
      <button id="projects-button4" onClick={handleProjects} className="navbar-button4">Projects</button>
      <button id="timetable-button4" onClick={handleTimetable} className="navbar-button4">Timetable</button>
      <button id="-button4" onClick={handleProblemset} className="navbar-button4">Problemset</button>
    </div>
  );
};

export default VerticalNavbar;
