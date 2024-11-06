import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaCalendarAlt, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

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

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-5 gap-4 py-2 border-b border-gray-700">
          <div>Status</div>
          <div>Title</div>
          <div>Solution</div>
          <div>Acceptance</div>
          <div>Difficulty</div>
        </div>
        {questions.map((question) => (
          <div key={question._id} className="grid grid-cols-5 gap-4 py-4 border-b border-gray-800">
            <div>
              {question.solvedBy.length > 0 ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaCalendarAlt className="text-gray-400" />
              )}
            </div>
            <div className="truncate">
              <Link to={`/question/${question._id}`} className="text-blue-400 hover:underline">
                {question.title}
              </Link>
            </div>
            <div>
              <FaLock className="text-purple-500 cursor-pointer" />
            </div>
            <div>{Math.round((question.successCount / question.submissionCount) * 100) || 0}%</div>
            <div className={`font-bold ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-400';
    case 'Medium':
      return 'text-yellow-500';
    case 'Hard':
      return 'text-red-500';
    default:
      return 'text-gray-400';
  }
};

export default QuestionList;
