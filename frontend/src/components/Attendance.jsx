import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Syllabus.css';

const Attendance = ({ branchName, semesterNumber }) => {
  const [syllabus, setSyllabus] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/syllabus', {
          params: { branchName, semesterNumber }
        });
        setSyllabus(response.data);
      } catch (err) {
        setError('Error fetching syllabus data');
      }
    };

    fetchSyllabus();
  }, [branchName, semesterNumber]);

  const handleAttendance = (subjectName, status) => {
    console.log(`Subject: ${subjectName}, Status: ${status}`);
    // Implement further functionality here, such as storing attendance data
  };

  if (error) return <p>{error}</p>;
  if (syllabus.length === 0) return <p>Loading syllabus...</p>;

  return (
    <div className="syllabus-container">
      {syllabus.map((branch) =>
        branch.semesters.map((semester) =>
          semester.subjects.map((subject, index) => (
            <div key={index} className="subject-card">
              <h3>{subject.subjectName}</h3>
              <div className="button-group">
                <button onClick={() => handleAttendance(subject.subjectName, 'Attended')} className="attended-btn">
                  Attended
                </button>
                <button onClick={() => handleAttendance(subject.subjectName, 'Missed')} className="missed-btn">
                  Missed
                </button>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default Attendance;
