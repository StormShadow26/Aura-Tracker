import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExamTimetable.css';

const motivationalQuotes = [
  "Believe you can and you're halfway there.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Success is not how high you have climbed, but how you make a positive difference to the world.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Dream big and dare to fail.",
];

const ExamTimetable = ({ branch, semester }) => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quote, setQuote] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);

  branch = "CSE";
  semester = 2;

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  };

  const calculateTimeLeft = (examDate) => {
    const now = new Date();
    const timeDiff = new Date(examDate) - now;
    if (timeDiff <= 0) return null;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const fetchExamTimetable = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/getTimetable`, { params: { branch, semester: parseInt(semester) } }
        );
        const examData = response.data.exams;
        setExams(examData);
        setLoading(false);

        setQuote(getRandomQuote());

        if (examData.length > 0) {
          const nextExamDate = examData
            .map((exam) => new Date(exam.date))
            .sort((a, b) => a - b)[0];
          setTimeLeft(calculateTimeLeft(nextExamDate));

          const timerInterval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(nextExamDate));
          }, 1000);

          return () => clearInterval(timerInterval);
        }
      } catch (err) {
        setError('Error fetching exam timetable');
        setLoading(false);
      }
    };

    fetchExamTimetable();
  }, [branch, semester]);

  if (loading) return <p>Loading timetable...</p>;
  if (error) return <p>{error}</p>;
  if (exams.length === 0) return <p>No exams found for this semester and branch.</p>;

  return (
    <div className="exam-timetable-container">
      <h2>Exam Timetable for {branch} - Semester {semester}</h2>

      {/* Motivational Quote Section */}
      <div className="quote-section">
        <p className="motivational-quote">"{quote}"</p>
      </div>

      {/* Countdown Timer */}
      {timeLeft && (
        <div className="countdown-timer">
          <h3>Time Left for Nearest Exam:</h3>
          <div className="timer-boxes">
            <div className="time-box">
              <p className="time-value">{timeLeft.days}</p>
              <p className="time-label">Days</p>
            </div>
            <div className="time-box">
              <p className="time-value">{timeLeft.hours}</p>
              <p className="time-label">Hours</p>
            </div>
            <div className="time-box">
              <p className="time-value">{timeLeft.minutes}</p>
              <p className="time-label">Minutes</p>
            </div>
            <div className="time-box">
              <p className="time-value">{timeLeft.seconds}</p>
              <p className="time-label">Seconds</p>
            </div>
          </div>
        </div>
      )}

      {/* Exam Timetable Grid */}
      <div className="exam-timetable-grid">
        {exams.map((exam, index) => (
          <div key={index} className="exam-tile">
            <h3>{exam.subject}</h3>
            <p>Date: {new Date(exam.date).toLocaleDateString()}</p>
            <p>
              Time: {exam.startTime} - {exam.endTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamTimetable;
