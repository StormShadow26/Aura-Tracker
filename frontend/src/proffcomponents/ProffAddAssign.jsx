import React, { useState } from 'react';
import axios from 'axios';

const AddAssignment = () => {
  const [formData, setFormData] = useState({
    assignmentNumber: '',
    subject: '',
    chapter: '',
    deadline: '',
    professorName: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/v1/add-assignment', {
        ...formData,
        email: 'branchsemester@gmail.com', // Hardcoded email
      });

      if (response.status === 201) {
        setMessage('Assignment created successfully!');
        setFormData({
          assignmentNumber: '',
          subject: '',
          chapter: '',
          deadline: '',
          professorName: '',
          description: '',
        });
      }
    } catch (error) {
      console.error('Error adding assignment:', error);
      setMessage('Could not add assignment. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Assignment</h2>
        
        {message && <p className="mb-4 text-center text-red-600">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Assignment Number</label>
            <input
              type="text"
              name="assignmentNumber"
              value={formData.assignmentNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Chapter</label>
            <input
              type="text"
              name="chapter"
              value={formData.chapter}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Professor Name</label>
            <input
              type="text"
              name="professorName"
              value={formData.professorName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition duration-200">
            Add Assignment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAssignment;
