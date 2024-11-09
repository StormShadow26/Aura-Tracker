import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Attendance.css';

const Attendance = ({ branchName = 'CSE', semesterNumber = 2 }) => {
  const [syllabus, setSyllabus] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/api/syllabus?branchName=${branchName}&semesterNumber=${semesterNumber}`);
        setSyllabus(response.data);
      } catch (err) {
        setError('Error fetching syllabus data');
      }
    };

    fetchSyllabus();
  }, [branchName, semesterNumber]);

  const handleAttendance = (subjectId, subjectName, status) => {
    console.log(`Subject ID: ${subjectId}, Name: ${subjectName}, Status: ${status}`);
  };

  if (error) return <p>{error}</p>;
  if (syllabus.length === 0) return <p>Loading syllabus... 🌱</p>;

  return (
    <div className="syllabus-container">
      <h2 className="welcome-message">Welcome! Track your attendance with a smile 😊</h2>
      {syllabus.map((branch) =>
        branch.semesters.map((semester) =>
          semester.subjects.map((subject) => (
            <div key={subject.id} className="subject-card">
              <h3 className="subject-title">{subject.subjectName}</h3>
              <div className="button-group">
                <button
                  onClick={() => handleAttendance(subject.id, subject.subjectName, 'Attended')}
                  className="attended-btn"
                >
                  ✅ Attended
                </button>
                <button
                  onClick={() => handleAttendance(subject.id, subject.subjectName, 'Missed')}
                  className="missed-btn"
                >
                  ❌ Missed
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
