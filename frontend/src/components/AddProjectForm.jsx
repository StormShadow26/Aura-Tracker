// src/components/AddProjectForm.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { EmailContext } from '../contexts/EmailContext';

const AddProjectForm = ({ refreshProjects }) => {
  const { email } = useContext(EmailContext);
  const [projectData, setProjectData] = useState({
    email: email,
    projectNumber: '',
    title: '',
    topic: '',
    deadline: '',
    supervisorName: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4000/api/v1/project', projectData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      refreshProjects();

      // Reset form after submission
      setProjectData({
        email: email,
        projectNumber: '',
        title: '',
        topic: '',
        deadline: '',
        supervisorName: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl shadow-xl mb-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-extrabold text-green-400 mb-4 text-center drop-shadow-lg">Add New Project</h2>
      
      <input
        type="number"
        name="projectNumber"
        placeholder="Project Number"
        value={projectData.projectNumber}
        onChange={handleChange}
        required
        className="block bg-gray-700 text-white border border-gray-600 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={projectData.title}
        onChange={handleChange}
        required
        className="block bg-gray-700 text-white border border-gray-600 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      
      <input
        type="text"
        name="topic"
        placeholder="Topic"
        value={projectData.topic}
        onChange={handleChange}
        required
        className="block bg-gray-700 text-white border border-gray-600 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      
      <input
        type="datetime-local"
        name="deadline"
        value={projectData.deadline}
        onChange={handleChange}
        required
        className="block bg-gray-700 text-white border border-gray-600 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      
      <input
        type="text"
        name="supervisorName"
        placeholder="Supervisor Name"
        value={projectData.supervisorName}
        onChange={handleChange}
        required
        className="block bg-gray-700 text-white border border-gray-600 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      
      <textarea
        name="description"
        placeholder="Description"
        value={projectData.description}
        onChange={handleChange}
        className="block bg-gray-700 text-white border border-gray-600 rounded-md p-3 mb-4 w-full h-28 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      
      <button 
        type="submit" 
        className="bg-green-500 text-gray-900 font-bold p-3 rounded-md w-full hover:bg-green-600 transition-colors"
      >
        Add Project
      </button>
    </form>
  );
};

export default AddProjectForm;
