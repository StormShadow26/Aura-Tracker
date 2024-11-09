import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const ProffDashBoard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    subject: "",
    semester: "",
  });
  const [qrData, setQrData] = useState("");

  const handleProffAddAssign = () => navigate("/proffaddassign");
  const handleAddTimetable = () => navigate("/ProffTimeTable");
  const handleAddExamTimetable = () => navigate("/ProffExam");
  const handleAssignProject = () => navigate("/ProffAddProjects");

  const handleMarkAttendance = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQrData("");
    setFormData({ date: "", subject: "", semester: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenerateQR = () => {
    const { date, subject, semester } = formData;
    if (date && subject && semester) {
      setQrData(`Date: ${date}, Subject: ${subject}, Semester: ${semester}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient bg-[length:200%_200%]">
      <h1 className="text-4xl font-bold text-white mb-12 z-10">
        Professor Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg w-full z-10">
        <button
          onClick={handleProffAddAssign}
          className="bg-blue-700 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-blue-800 transition duration-200"
        >
          Add Assignments
        </button>
        <button
          onClick={handleAddTimetable}
          className="bg-orange-700 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-orange-800 transition duration-200"
        >
          Add Time Table
        </button>
        <button
          onClick={handleAddExamTimetable}
          className="bg-green-700 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-green-800 transition duration-200"
        >
          Add Examination Time Table
        </button>
        <button
          onClick={handleAssignProject}
          className="bg-teal-700 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-teal-800 transition duration-200"
        >
          Assign Project
        </button>
        <button
          onClick={handleMarkAttendance}
          className="bg-red-700 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-red-800 transition duration-200"
        >
          Mark Attendance
        </button>
      </div>

      {/* Modal for Mark Attendance */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Mark Attendance
            </h2>
            <div className="flex flex-col space-y-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded text-black"
                placeholder="Date"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded text-black"
                placeholder="Subject"
              />
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded text-black"
                placeholder="Semester"
              />
              <button
                onClick={handleGenerateQR}
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Generate
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200 mt-2"
              >
                Close
              </button>
            </div>
            {qrData && (
              <div className="mt-4 flex justify-center">
                <QRCodeCanvas value={qrData} size={200} />
              </div>
            )}
          </div>
        </div>
      )}

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

          /* Fade-in animation for modal */
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default ProffDashBoard;
