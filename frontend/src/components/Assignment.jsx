import React, { useEffect, useState, useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AddAssignmentForm from './AddAssignmentForm';
import './Assignment.css';

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { email } = useContext(EmailContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get('email') || email;

  const fetchAssignments = async () => {
    if (!emailFromQuery) {
      console.error('Email is not available. User may not be logged in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/api/v1/assignment/${emailFromQuery}`);
      const sortedAssignments = response.data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      setAssignments(sortedAssignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAssignment = async (assignmentNumber) => {
    try {
      await axios.post(`http://localhost:4000/api/v1/submit`, {
        email: emailFromQuery,
        assignmentNumber: assignmentNumber,
      });
      fetchAssignments();
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [emailFromQuery]);

  if (loading) {
    return <div id="loading14">Loading assignments...</div>;
  }

  return (
    <div id="mainContainer14">
      <div id="assignmentList14">
        <h1 id="title14">Assignments</h1>

        <div id="divider14"></div>

        <div id="addAssignmentPanel14">
          <AddAssignmentForm refreshAssignments={fetchAssignments} />
        </div>

        <div id="assignmentsContainer14">
          {assignments.length > 0 ? (
            assignments.filter((assignment) => new Date(assignment.deadline) >= new Date()).map((assignment, index) => {
              const deadline = new Date(assignment.deadline);
              const now = new Date();
              const isDeadlinePassed = deadline < now;
              const isLeftAligned = Math.floor(index / 2) % 2 === 0;

              return (
                <div
                  key={assignment.assignmentNumber}
                  className={`assignmentTile14 ${isLeftAligned ? 'left14' : 'right14'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`assignmentNumber14 ${assignment.submitted ? 'submitted14' : 'notSubmitted14'}`}>
                    {index + 1}
                  </div>

                  <h2 className="assignmentTitle14">
                    {assignment.subject} - Chapter: {assignment.chapter}
                  </h2>
                  <p className="assignmentDetail14">
                    <strong>Deadline:</strong> {deadline.toLocaleString()}
                  </p>
                  <p className="assignmentDetail14">
                    <strong>Submitted:</strong> {assignment.submitted ? 'Yes' : 'No'}
                  </p>
                  <p className="assignmentDetail14">
                    <strong>Professor:</strong> {assignment.professorName}
                  </p>
                  <p className="assignmentDescription14">
                    <strong>Description:</strong> {assignment.description}
                  </p>

                  {!assignment.submitted && !isDeadlinePassed && (
                    <button
                      className="submitButton14"
                      onClick={() => handleSubmitAssignment(assignment.assignmentNumber)}
                    >
                      Submit Now
                    </button>
                  )}

                  {/* Connecting Line */}
                  {index < assignments.length - 1 && (
                    <div className={`connectorLine14 ${isLeftAligned ? 'toRight14' : 'toLeft14'}`} />
                  )}
                </div>
              );
            })
          ) : (
            <div id="noAssignments14">No assignments found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignment;
