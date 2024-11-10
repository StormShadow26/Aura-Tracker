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

  if (loading) return <p id="loading-message28">Loading timetable...</p>;
  if (error) return <p id="error-message28">{error}</p>;
  if (exams.length === 0) return <p id="no-exams-message28">No exams found for this semester and branch.</p>;

  return (
    <div id="exam-timetable-container28" className="exam-timetable-container">
      <h2 id="exam-timetable-heading28">Exam Timetable for {branch} - Semester {semester}</h2>

      {/* Motivational Quote Section */}
      <div id="quote-section28" className="quote-section">
        <p id="motivational-quote28" className="motivational-quote">"{quote}"</p>
      </div>

      {/* Countdown Timer */}
      {timeLeft && (
        <div id="countdown-timer28" className="countdown-timer">
          <h3 id="countdown-timer-heading28">Time Left for Nearest Exam:</h3>
          <div id="timer-boxes28" className="timer-boxes">
            <div id="days-box28" className="time-box">
              <p id="days-value28" className="time-value">{timeLeft.days}</p>
              <p id="days-label28" className="time-label">Days</p>
            </div>
            <div id="hours-box28" className="time-box">
              <p id="hours-value28" className="time-value">{timeLeft.hours}</p>
              <p id="hours-label28" className="time-label">Hours</p>
            </div>
            <div id="minutes-box28" className="time-box">
              <p id="minutes-value28" className="time-value">{timeLeft.minutes}</p>
              <p id="minutes-label28" className="time-label">Minutes</p>
            </div>
            <div id="seconds-box28" className="time-box">
              <p id="seconds-value28" className="time-value">{timeLeft.seconds}</p>
              <p id="seconds-label28" className="time-label">Seconds</p>
            </div>
          </div>
        </div>
      )}

      {/* Exam Timetable Grid */}
      <div id="exam-timetable-grid28" className="exam-timetable-grid">
        {exams.map((exam, index) => (
          <div key={index} id={`exam-tile-${index + 1}28`} className="exam-tile">
            <h3 id={`exam-subject-${index + 1}28`}>{exam.subject}</h3>
            <p id={`exam-date-${index + 1}28`}>Date: {new Date(exam.date).toLocaleDateString()}</p>
            <p id={`exam-time-${index + 1}28`}>
              Time: {exam.startTime} - {exam.endTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamTimetable;
