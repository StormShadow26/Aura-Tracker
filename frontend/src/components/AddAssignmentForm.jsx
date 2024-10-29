// src/components/AddAssignmentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddAssignmentForm = ({ refreshAssignments }) => {
  const [assignmentData, setAssignmentData] = useState({
    assignmentNumber: '',
    subject: '',
    chapter: '',
    deadline: '',
    professorName: '',
    description: '',
    attachments: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData({
      ...assignmentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/v1/assignments', assignmentData);
      refreshAssignments(); // Refresh the assignment list after adding
      setAssignmentData({ // Reset form
        assignmentNumber: '',
        subject: '',
        chapter: '',
        deadline: '',
        professorName: '',
        description: '',
        attachments: []
      });
    } catch (error) {
      console.error('Error adding assignment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-2">Add New Assignment</h2>
      <input
        type="number"
        name="assignmentNumber"
        placeholder="Assignment Number"
        value={assignmentData.assignmentNumber}
        onChange={handleChange}
        required
        className="block border border-gray-300 rounded-md p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={assignmentData.subject}
        onChange={handleChange}
        required
        className="block border border-gray-300 rounded-md p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="chapter"
        placeholder="Chapter"
        value={assignmentData.chapter}
        onChange={handleChange}
        required
        className="block border border-gray-300 rounded-md p-2 mb-2 w-full"
      />
      <input
        type="datetime-local"
        name="deadline"
        value={assignmentData.deadline}
        onChange={handleChange}
        required
        className="block border border-gray-300 rounded-md p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="professorName"
        placeholder="Professor Name"
        value={assignmentData.professorName}
        onChange={handleChange}
        required
        className="block border border-gray-300 rounded-md p-2 mb-2 w-full"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={assignmentData.description}
        onChange={handleChange}
        className="block border border-gray-300 rounded-md p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Add Assignment</button>
    </form>
  );
};

export default AddAssignmentForm;
