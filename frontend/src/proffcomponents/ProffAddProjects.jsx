import React, { useState } from 'react';
import axios from 'axios';

const AddProject = () => {
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [deadline, setDeadline] = useState('');
  const [supervisorName, setSupervisorName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [projectNumber, setProjectNumber] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleBranchChange = (e) => setBranch(e.target.value);
  const handleSemesterChange = (e) => setSemester(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTopicChange = (e) => setTopic(e.target.value);
  const handleDeadlineChange = (e) => setDeadline(e.target.value);
  const handleSupervisorNameChange = (e) => setSupervisorName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Generate email based on branch and semester
  const generateEmail = () => {
    const email = `${branch}${semester}@gmail.com`;
    setEmail(email);
  };

  // Generate project number (You can modify this as per your requirements)
  const generateProjectNumber = () => {
    // For now, let's just randomly generate a number
    setProjectNumber(Math.floor(Math.random() * 1000));
  };

  // Submit the form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure email and project number are generated before submission
    generateEmail();
    generateProjectNumber();

    // Validate required fields before sending
    if (!email || !projectNumber || !title || !topic || !deadline || !supervisorName || !description) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/project', {
        email,
        projectNumber,
        title,
        topic,
        deadline,
        supervisorName,
        description,
      });

      setSuccessMessage(response.data.message);
      setError('');
      // Reset form after submission
      setBranch('');
      setSemester('');
      setTitle('');
      setTopic('');
      setDeadline('');
      setSupervisorName('');
      setDescription('');
      setEmail('');
      setProjectNumber('');
    } catch (error) {
      setError('Error adding project. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-600">Add Project</h2>

      {/* Show success or error message */}
      {successMessage && <div className="text-green-600 mb-4 text-center">{successMessage}</div>}
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch:</label>
          <select
            value={branch}
            onChange={handleBranchChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EE">EE</option>
            <option value="ME">ME</option>
            <option value="CE">CE</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Semester:</label>
          <input
            type="number"
            value={semester}
            onChange={handleSemesterChange}
            placeholder="Enter semester number"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter project title"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={handleTopicChange}
            placeholder="Enter project topic"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deadline:</label>
          <input
            type="date"
            value={deadline}
            onChange={handleDeadlineChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor Name:</label>
          <input
            type="text"
            value={supervisorName}
            onChange={handleSupervisorNameChange}
            placeholder="Enter supervisor's name"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter project description"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
