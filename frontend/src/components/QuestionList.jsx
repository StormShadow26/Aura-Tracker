import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaCalendarAlt, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './QuestionList.css';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/getquest'); 
        setQuestions(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Function to check if the question was created today
  const isDailyChallenge = (createdAt) => {
    const today = new Date();
    const createdDate = new Date(createdAt);
    return today.toDateString() === createdDate.toDateString();
  };

  // Function to get difficulty color based on difficulty level
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'easy';
      case 'Medium':
        return 'medium';
      case 'Hard':
        return 'hard';
      default:
        return '';
    }
  };

  return (
    <div id="container21" className="container mx-auto p-4">
      <div id="header21" className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
        <div>Status</div>
        <div>Title</div>
        <div>Solution</div>
        <div>Acceptance</div>
        <div>Difficulty</div>
      </div>
      {questions.map((question) => (
        <div key={question._id} className="question-entry21 grid grid-cols-5 gap-4 py-4 border-b border-gray-800">
          <div className={`status-icon21 ${question.solvedBy.length > 0 ? 'solved' : 'not-solved'}`}>
            {question.solvedBy.length > 0 ? <FaCheckCircle /> : <FaCalendarAlt />}
          </div>
          <div className="title21 truncate">
            <Link to={`/question/${question._id}`}>
              {question.title}
            </Link>
            {isDailyChallenge(question.createdAt) && (
              <span className="daily-challenge21">Daily Challenge</span>
            )}
          </div>
          <div className="solution-icon21">
            <FaLock />
          </div>
          <div className="acceptance-rate21">
            {Math.round((question.successCount / question.submissionCount) * 100) || 0}%
          </div>
          <div className={`difficulty21 ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
