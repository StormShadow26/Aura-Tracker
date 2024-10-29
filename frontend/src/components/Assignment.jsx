// src/components/Assignment.js
import React, { useEffect, useState, useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation
import AddAssignmentForm from './AddAssignmentForm';

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { email } = useContext(EmailContext); // Get the email from context

  // Use location to access the query parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get('email') || email; // Use query parameter or context email

  const fetchAssignments = async () => {
    if (!emailFromQuery) {
      console.error('Email is not available. User may not be logged in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/api/v1/assignment/${emailFromQuery}`);
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments(); // Call fetchAssignments when component mounts or when emails change
  }, [emailFromQuery]);

  if (loading) {
    return <div>Loading assignments...</div>;
  }

  return (
    <div className="assignment-list p-4">
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
      <AddAssignmentForm refreshAssignments={fetchAssignments} />
      <div className="grid grid-cols-1 gap-4 mt-4">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div key={assignment.assignmentNumber} className="bg-white shadow-md p-4 rounded-md">
              <h2 className="font-semibold">{assignment.subject} - Chapter: {assignment.chapter}</h2>
              <p><strong>Deadline:</strong> {new Date(assignment.deadline).toLocaleString()}</p>
              <p><strong>Submitted:</strong> {assignment.submitted ? 'Yes' : 'No'}</p>
              <p><strong>Professor:</strong> {assignment.professorName}</p>
              <p><strong>Description:</strong> {assignment.description}</p>
              {assignment.attachments.length > 0 && (
                <div>
                  <strong>Attachments:</strong>
                  <ul>
                    {assignment.attachments.map((attachment, index) => (
                      <li key={index}>
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.filename}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No assignments found.</div>
        )}
      </div>
    </div>
  );
};

export default Assignment;
