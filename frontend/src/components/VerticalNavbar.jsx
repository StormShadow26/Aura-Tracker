// src/components/VerticalNavbar.js
import React, { useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import { useNavigate } from 'react-router-dom';

const VerticalNavbar = () => {
  const navigate = useNavigate();
  const { email } = useContext(EmailContext); // Get the email from context
  console.log(email,"= navbar wala");

  // Handler functions for navigation
  const handleDashboard = () => navigate(`/dashboard?email=${encodeURIComponent(email)}`);
  const handleAttendance = () => navigate(`/attendance?email=${encodeURIComponent(email)}`);
  const handleAssignments = () => navigate(`/assignments/${encodeURIComponent(email)}`);
  const handleProjects = () => navigate(`/projects?email=${encodeURIComponent(email)}`);
  const handleTimetable = () => navigate(`/timetable?email=${encodeURIComponent(email)}`);

  return (
    <div className="bg-gray-700 text-white w-48 h-full fixed top-16 flex flex-col space-y-4 p-4">
      <button onClick={handleDashboard} className="hover:bg-gray-600 p-2 rounded w-full text-left">Dashboard</button>
      <button onClick={handleAttendance} className="hover:bg-gray-600 p-2 rounded w-full text-left">Attendance</button>
      <button onClick={handleAssignments} className="hover:bg-gray-600 p-2 rounded w-full text-left">Assignments</button>
      <button onClick={handleProjects} className="hover:bg-gray-600 p-2 rounded w-full text-left">Projects</button>
      <button onClick={handleTimetable} className="hover:bg-gray-600 p-2 rounded w-full text-left">Timetable</button>
    </div>
  );
};

export default VerticalNavbar;
