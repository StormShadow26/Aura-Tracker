import React, { useEffect, useState, useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AddProjectForm from './AddProjectForm';
import './Project.css';

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

      fetchProjects();
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [emailFromQuery]);

  if (loading) {
    return <div id="loading16" className="loading-message">Loading projects...</div>;
  }

  return (
    <div id="mainContainer16" className="main-container">
      <div id="projectsContainer16" className="projects-container">
        <h1 id="title16" className="title">Projects</h1>

        <div id="divider16" className="divider"></div>

        <div id="addProjectPanel16" className="add-project-panel">
          <AddProjectForm refreshProjects={fetchProjects} />
        </div>

        <div className="projects-list">
          {projects.length > 0 ? (
            projects.map((project, index) => {
              const deadline = new Date(project.deadline);
              const now = new Date();
              const isDeadlinePassed = deadline < now;

              return (
                <div
                  key={project.projectNumber}
                  id={`projectTile${index + 1}16`}
                  className={`project-tile ${index % 2 === 0 ? 'even' : 'odd'}`}
                 
                >
                  <div
                    id={`projectNumber${index + 1}16`}
                    className={`project-number ${project.submitted ? 'submitted16' : 'notSubmitted16'}`}
                  >
                    {index + 1}
                  </div>

                  <h2 id={`projectTitle${index + 1}16`} className="project-title">
                    {project.title} - Topic: {project.topic}
                  </h2>
                  <p id={`projectDeadline${index + 1}16`} className="project-detail">
                    <strong>Deadline:</strong> {deadline.toLocaleString()}
                  </p>
                  <p id={`projectSubmitted${index + 1}16`} className="project-detail">
                    <strong>Completed:</strong> {project.submitted ? 'Yes' : 'No'}
                  </p>
                  <p id={`projectSupervisor${index + 1}16`} className="project-detail">
                    <strong>Supervisor:</strong> {project.supervisorName}
                  </p>
                  <p id={`projectDescription${index + 1}16`} className="project-description">
                    <strong>Description:</strong> {project.description}
                  </p>

                  {!project.submitted && !isDeadlinePassed && (
                    <button
                      id={`submitButton${index + 1}16`}
                      className="submit-button"
                      onClick={() => handleSubmitProject(project.projectNumber)}
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <div id="noProjects16" className="no-projects-message">No projects found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
