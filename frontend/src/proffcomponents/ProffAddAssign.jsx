import React, { useState } from 'react';
import axios from 'axios';

const AddAssignment = () => {
  const [assignmentData, setAssignmentData] = useState({
    assignmentNumber: '',
    subject: '',
    chapter: '',
    deadline: '',
    professorName: '',
    description: '',
    branch: '',
    semester: '',
    email: '',
  });

  // Predefined branch and semester options
  const branches = ['CSE', 'ECE', 'Mechanical', 'Civil', 'IT'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const handleChange = (e) => {
    setAssignmentData({
      ...assignmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = `${assignmentData.branch}${assignmentData.semester}@gmail.com`;
    try {
      const response = await axios.post('http://localhost:4000/api/v1/addAssignmentProff', {
        ...assignmentData,
        email,
      });
      alert(response.data.message);
    } catch (error) {
      alert('Error: Could not add assignment');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add Assignment</h2>
      <form onSubmit={handleSubmit}>
        {/* Branch Dropdown */}
        <div className="mb-4">
          <label htmlFor="branch" className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
          <select
            name="branch"
            value={assignmentData.branch}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>

        {/* Semester Dropdown */}
        <div className="mb-4">
          <label htmlFor="semester" className="block text-sm font-semibold text-gray-700 mb-2">Semester</label>
          <select
            name="semester"
            value={assignmentData.semester}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Semester</option>
            {semesters.map((semester) => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>

        {/* Assignment Details */}
        <div className="mb-4">
          <input
            type="text"
            name="assignmentNumber"
            value={assignmentData.assignmentNumber}
            onChange={handleChange}
            placeholder="Assignment Number"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="subject"
            value={assignmentData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="chapter"
            value={assignmentData.chapter}
            onChange={handleChange}
            placeholder="Chapter"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="datetime-local"
            name="deadline"
            value={assignmentData.deadline}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="professorName"
            value={assignmentData.professorName}
            onChange={handleChange}
            placeholder="Professor Name"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            value={assignmentData.description}
            onChange={handleChange}
            placeholder="Assignment Description"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Assignment
        </button>
      </form>
    </div>
  );
};

export default AddAssignment;
