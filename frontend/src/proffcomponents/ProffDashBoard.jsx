import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProffDashBoard = () => {
  const navigate = useNavigate();

  const handleProffAddAssign = () => navigate('/proffaddassign');
  const handleUpdateTimetable = () => navigate('/proffupdatetimetable');
  const handleAddTimetable = () => navigate('/proffaddtimetable');
  const handleAddExamTimetable = () => navigate('/proffaddexam');
  const handleAssignProject = () => navigate('/profassignproject');
  const handleMarkAttendance = () => navigate('/profmarkttendance');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient bg-[length:200%_200%]">
      <h1 className="text-4xl font-bold text-white mb-12 z-10">Professor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg w-full z-10">
        <button onClick={handleProffAddAssign} className="bg-blue-700 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-blue-800 transition duration-200">
          Add Assignments
        </button>
        <button onClick={handleUpdateTimetable} className="bg-violet-700 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-violet-800 transition duration-200">
          Update Time Table
        </button>
        <button onClick={handleAddTimetable} className="bg-orange-700 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-orange-800 transition duration-200">
          Add Time Table
        </button>
        <button onClick={handleAddExamTimetable} className="bg-green-700 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-green-800 transition duration-200">
          Add Examination Time Table
        </button>
        <button onClick={handleAssignProject} className="bg-teal-700 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-teal-800 transition duration-200">
          Assign Project
        </button>
        <button onClick={handleMarkAttendance} className="bg-red-700 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-red-800 transition duration-200">
          Mark Attendance
        </button>
      </div>

      <style>
        {`
          .animate-gradient {
            animation: gradientMove 8s ease infinite;
          }
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default ProffDashBoard;
