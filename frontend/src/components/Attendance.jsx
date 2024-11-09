import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Attendance.css';
import { useParams } from 'react-router-dom';  // Import useParams to access URL params

const Attendance = ({ branchName = 'CSE', semesterNumber = 2 }) => {
  const { email } = useParams();  // Access email from URL params
  const [syllabus, setSyllabus] = useState([]);
  const [userData, setUserData] = useState(null); // State to store the user data
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch syllabus and user data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch syllabus data
        const syllabusResponse = await axios.get(`http://localhost:4000/api/v1/api/syllabus?branchName=${branchName}&semesterNumber=${semesterNumber}`);
        setSyllabus(syllabusResponse.data);

        // Fetch user attendance data
        const userResponse = await axios.get(`http://localhost:4000/api/v1/getUserData/${email}`);
        console.log(userResponse.data)
        setUserData(userResponse.data);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      }
    };

    fetchData();
  }, [branchName, semesterNumber, email]);

  // Handle attendance update
  const handleAttendance = async (subjectId, subjectName, status) => {
    setLoading(true);
    try {
      // Adjust subject name to match backend naming convention
      if (subjectName === "Analysis of Algorithms") {
        subjectName = "AnalysisOfAlgorithms";
      } else if (subjectName === "Operations Research") {
        subjectName = "OperationResearch";
      } else if (subjectName === "Automata Theory") {
        subjectName = "AutomataTheory";
      } else if (subjectName === "Object-Oriented Programming (OOP)") {
        subjectName = "Oops";
      }

      // Send the attendance data to the backend
      const response = await axios.post('http://localhost:4000/api/v1/update-attendance', {
        email,
        subject: subjectName,
        isAttended: status === 'Attended',
      });

      // Log success message or perform other actions
      console.log(response.data.message);
      setLoading(false); // Stop the loading indicator
    } catch (err) {
      setLoading(false);
      setError('Error updating attendance');
      console.error(err);
    }
  };

  const calculateAttendancePercentage = (subject) => {
    console.log(subject);
    const totalClasses = subject.totalClass;
    const attendedClasses = subject.attendedClass;
    console.log(attendedClasses/totalClasses)
    return totalClasses > 0 ? ((attendedClasses / totalClasses) * 100).toFixed(2) : 0;
  };

  if (error) return <p>{error}</p>;
  if (syllabus.length === 0 || !userData) return <p>Loading data... 🌱</p>;

  return (
    <div className="syllabus-container">
      <h2 className="welcome-message">Welcome! Track your attendance with a smile 😊</h2>

      {syllabus.map((branch) =>
        branch.semesters.map((semester) =>
          semester.subjects.map((subject) => {
            // Get subject attendance data from userData
            const subjectAttendance = userData[subject.subjectName.replace(/\s+/g, '')]; // Match subject name with user data
            const attendancePercentage = subjectAttendance ? calculateAttendancePercentage(subjectAttendance) : 0;

            return (
              <div key={subject.id} className="subject-card">
                <h3 className="subject-title">{subject.subjectName}</h3>
                <div className="attendance-info">
                  <p>Attendance: {attendancePercentage}%</p>
                </div>
                <div className="button-group">
                  <button
                    onClick={() => handleAttendance(subject.id, subject.subjectName, 'Attended')}
                    className="attended-btn"
                    disabled={loading}
                  >
                    ✅ Attended
                  </button>
                  <button
                    onClick={() => handleAttendance(subject.id, subject.subjectName, 'Missed')}
                    className="missed-btn"
                    disabled={loading}
                  >
                    ❌ Missed
                  </button>
                </div>
              </div>
            );
          })
        )
      )}
    </div>
  );
};

export default Attendance;