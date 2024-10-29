import React, { useEffect, useState, useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AddProjectForm from './AddProjectForm';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { email } = useContext(EmailContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get('email') || email;

  const fetchProjects = async () => {
    if (!emailFromQuery) {
      console.error('Email is not available. User may not be logged in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/api/v1/project/${emailFromQuery}`);
      const sortedProjects = response.data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      setProjects(sortedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProject = async (projectNumber) => {
    try {
      await axios.post(`http://localhost:4000/api/v1/submitproject`, {
        email: emailFromQuery,
        projectNumber: projectNumber,
      });

      // Re-fetch projects after submitting one to get the updated data
      fetchProjects();
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [emailFromQuery]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white bg-gray-900">Loading projects...</div>;
  }

  return (
    <div className="min-h-screen" style={{ background: 'black', paddingBottom: '50px' }}>
      <div className="project-list p-6 max-w-screen-lg mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-6 text-green-400 drop-shadow-lg">Projects</h1>

        <div className="border-t-4 border-green-500 my-8 mx-auto w-2/3"></div>

        <div className="mb-10">
          <AddProjectForm refreshProjects={fetchProjects} />
        </div>

        <div className="relative flex flex-col items-center mt-6 space-y-12">
          <div className="absolute w-2 bg-gradient-to-b from-green-500 via-blue-600 to-purple-500 h-full left-1/2 transform -translate-x-1/2" />

          {projects.length > 0 ? (
            projects.map((project, index) => {
              const deadline = new Date(project.deadline);
              const now = new Date();
              const isDeadlinePassed = deadline < now;

              const gradientClass = index % 2 === 0
                ? 'bg-gradient-to-r from-green-500 to-blue-500'
                : 'bg-gradient-to-r from-blue-500 to-green-500';

              return (
                <div
                  key={project.projectNumber}
                  className={`relative flex flex-col items-center w-64 p-6 rounded-xl shadow-2xl transition-all transform hover:scale-105 ${gradientClass}`}
                  style={{
                    transform: `translateX(${index % 2 === 0 ? '-50%' : '50%'})`,
                  }}
                >
                  <div
                    className={`absolute -top-7 w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-white text-lg shadow-md ${
                      project.submitted ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  >
                    {index + 1}
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2 text-center">
                    {project.title} - Topic: {project.topic}
                  </h2>
                  <p className="text-sm text-gray-300">
                    <strong>Deadline:</strong> {deadline.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Completed:</strong> {project.submitted ? 'Yes' : 'No'}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Supervisor:</strong> {project.supervisorName}
                  </p>
                  <p className="text-sm text-gray-300 mb-3">
                    <strong>Description:</strong> {project.description}
                  </p>

                  {!project.submitted && !isDeadlinePassed && (
                    <button
                      className="bg-green-500 text-white p-2 mt-2 rounded-md hover:bg-green-600 transition-colors"
                      onClick={() => handleSubmitProject(project.projectNumber)}
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-white text-xl">No projects found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
