// src/components/AddAssignmentForm.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { EmailContext } from '../contexts/EmailContext';

const AddAssignmentForm = ({ refreshAssignments }) => {
  const { email } = useContext(EmailContext);
  const [assignmentData, setAssignmentData] = useState({
    email: email,
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

  const handleFileChange = (e) => {
    setAssignmentData({
      ...assignmentData,
      attachments: Array.from(e.target.files) // Store multiple files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (const key in assignmentData) {
      if (key === 'attachments') {
        assignmentData.attachments.forEach(file => {
          formData.append('attachments', file);
        });
      } else {
        formData.append(key, assignmentData[key]);
      }
    }

    try {
      await axios.post('http://localhost:4000/api/v1/assignment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      refreshAssignments(); // Refresh the assignment list after adding

      setAssignmentData({ // Reset form
        assignmentNumber: '',
        email: email,
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
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl shadow-xl mb-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-extrabold text-yellow-400 mb-4 text-center drop-shadow-lg">Add New Assignment</h2>
      
      <input
        type="number"
        name="assignmentNumber"
        placeholder="Assignment Number"
        value={assignmentData.assignmentNumber}
        onChange={handleChange}
        required
        className="block bg-gray-700 text-white border border-gray-600 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={assignmentData.subject}
        onChange={handleChange}
        required
        className="block bg-gray-700 text-white border border-gray-600 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      
      <input
        type="text"
        name="chapter"
        placeholder="Chapter"
        value={assignmentData.chapter}
        onChange={handleChange}
        required
        className="block bg-gray-700 text-white border border-gray-600 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      
      <input
        type="datetime-local"
        name="deadline"
        value={assignmentData.deadline}
        onChange={handleChange}
        required
        className="block bg-gray-700 text-white border border-gray-600 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      
      <input
        type="text"
        name="professorName"
        placeholder="Professor Name"
        value={assignmentData.professorName}
        onChange={handleChange}
        required
        className="block bg-gray-700 text-white border border-gray-600 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      
      <textarea
        name="description"
        placeholder="Description"
        value={assignmentData.description}
        onChange={handleChange}
        className="block bg-gray-700 text-white border border-gray-600 rounded-md p-3 mb-4 w-full h-28 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      <input
        type="file"
        name="attachments"
        multiple
        onChange={handleFileChange}
        className="block bg-gray-700 text-gray-300 border border-gray-600 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      
      <button type="submit" className="bg-yellow-500 text-gray-900 font-bold p-3 rounded-md w-full hover:bg-yellow-600 transform transition-transform hover:scale-105">
        Add Assignment
      </button>
    </form>
  );
};

export default AddAssignmentForm;
