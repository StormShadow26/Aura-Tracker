import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Attendance.css';
import { useParams } from 'react-router-dom';

const Attendance = ({ branchName = 'CSE', semesterNumber = 2 }) => {
  const { email } = useParams();
  const [syllabus, setSyllabus] = useState([]);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const subjectNameMap = {
    'Analysis of Algorithms': 'AnalysisOfAlgorithms',
    'Operations Research': 'OperationResearch',
    'Automata Theory': 'AutomataTheory',
    'Object-Oriented Programming (OOP)': 'Oops',
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const syllabusResponse = await axios.get(`http://localhost:4000/api/v1/api/syllabus?branchName=${branchName}&semesterNumber=${semesterNumber}`);
      setSyllabus(syllabusResponse.data);

      const userResponse = await axios.get(`http://localhost:4000/api/v1/getUserData/${email}`);
      setUserData(userResponse.data);
      setError('');
    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [branchName, semesterNumber, email]);

  const handleAttendance = async (subjectId, subjectName, status) => {
    setLoading(true);
    try {
      const mappedSubjectName = subjectNameMap[subjectName] || subjectName;
      await axios.post('http://localhost:4000/api/v1/update-attendance', {
        email,
        subject: mappedSubjectName,
        isAttended: status === 'Attended',
      });
      setError('');
      fetchData(); // Refresh data after updating attendance
    } catch (err) {
      setError('Error updating attendance');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateAttendancePercentage = (subject) => {
    const totalClasses = subject?.totalClass || 0;
    const attendedClasses = subject?.attendedClass || 0;
    return totalClasses > 0 ? ((attendedClasses / totalClasses) * 100).toFixed(2) : 0;
  };

  if (error) return <p>{error}</p>;
  if (loading || syllabus.length === 0 || !userData) return <p>Loading data... 🌱</p>;

  return (
    <div className="syllabus-container26">
      <h2 className="welcome-message26">Welcome! Track your attendance with a smile 😊</h2>

      {syllabus.map((branch) =>
        branch.semesters.map((semester) =>
          semester.subjects.map((subject) => {
            const mappedSubjectName = subjectNameMap[subject.subjectName] || subject.subjectName;
            const subjectAttendance = userData[mappedSubjectName];
            const attendancePercentage = subjectAttendance ? calculateAttendancePercentage(subjectAttendance) : 0;

            return (
              <div key={subject.id} className="subject-card26">
                <h3 className="subject-title26">{subject.subjectName}</h3>
                <div className="attendance-info26">
                  <p>Attendance: {attendancePercentage}%</p>
                </div>
                <div className="button-group26">
                  <button
                    onClick={() => handleAttendance(subject.id, subject.subjectName, 'Attended')}
                    className="attended-btn26"
                    disabled={loading}
                  >
                    ✅ Attended
                  </button>
                  <button
                    onClick={() => handleAttendance(subject.id, subject.subjectName, 'Missed')}
                    className="missed-btn26"
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