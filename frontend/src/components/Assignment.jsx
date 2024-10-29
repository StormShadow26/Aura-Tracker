// src/components/Assignment.js
import React, { useEffect, useState, useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AddAssignmentForm from './AddAssignmentForm';

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

  useEffect(() => {
    fetchAssignments();
  }, [emailFromQuery]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white bg-gray-900">Loading assignments...</div>;
  }

  return (
    <div className="min-h-screen" style={{ background: 'black', paddingBottom: '50px' }}>
      <div className="assignment-list p-6 max-w-screen-lg mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-6 text-pink-400 drop-shadow-lg">Assignments</h1>

        {/* Section Divider */}
        <div className="border-t-4 border-pink-500 my-8 mx-auto w-2/3"></div>

        {/* Add Assignment Form */}
        <div className="mb-10">
          <AddAssignmentForm refreshAssignments={fetchAssignments} />
        </div>

        {/* Pathway Container */}
        <div className="relative flex flex-col items-center mt-6 space-y-12">
          {/* Path line */}
          <div className="absolute w-2 bg-gradient-to-b from-pink-500 via-purple-600 to-blue-500 h-full left-1/2 transform -translate-x-1/2" />

          {assignments.length > 0 ? (
            assignments.map((assignment, index) => {
              const deadline = new Date(assignment.deadline);
              const now = new Date();
              const isDeadlinePassed = deadline < now;

              // Alternate between pink and blue gradients based on the index
              const gradientClass = index % 2 === 0
                ? 'bg-gradient-to-r from-pink-500 to-blue-500'
                : 'bg-gradient-to-r from-blue-500 to-pink-500';

              return (
                <div
                  key={assignment.assignmentNumber}
                  className={`relative flex flex-col items-center w-64 p-6 rounded-xl shadow-2xl transition-all transform hover:scale-105 ${gradientClass}`}
                  style={{
                    transform: `translateX(${index % 2 === 0 ? '-50%' : '50%'})`,
                  }}
                >
                  {/* Assignment Number Icon */}
                  <div
                    className={`absolute -top-7 w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-white text-lg shadow-md ${
                      assignment.submitted ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Assignment Details */}
                  <h2 className="text-xl font-bold text-white mb-2 text-center">
                    {assignment.subject} - Chapter: {assignment.chapter}
                  </h2>
                  <p className="text-sm text-gray-300">
                    <strong>Deadline:</strong> {deadline.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Submitted:</strong> {assignment.submitted ? 'Yes' : 'No'}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Professor:</strong> {assignment.professorName}
                  </p>
                  <p className="text-sm text-gray-300 mb-3">
                    <strong>Description:</strong> {assignment.description}
                  </p>

                  {/* Submit Now Button */}
                  {!assignment.submitted && !isDeadlinePassed && (
                    <button
                      className="bg-pink-500 text-white p-2 mt-2 rounded-md hover:bg-pink-600 transition-colors"
                      onClick={() => console.log(`Submitting assignment ${assignment.assignmentNumber}`)}
                    >
                      Submit Now
                    </button>
                  )}

                  {/* Attachments */}
                  {assignment.attachments.length > 0 && (
                    <div className="mt-3 text-sm">
                      <strong className="text-pink-400">Attachments:</strong>
                      <ul className="pl-4">
                        {assignment.attachments.map((attachment, idx) => (
                          <li key={idx} className="text-blue-300 underline hover:text-white">
                            <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                              {attachment.filename}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-white text-xl">No assignments found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignment;
