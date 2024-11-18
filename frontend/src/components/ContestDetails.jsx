import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaCalendarAlt, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './ContestDetails.css';

const ContestDetails = () => {
  const { contestId } = useParams();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/getcontests/${contestId}`);
        setContest(response.data.contest);
        setLoading(false);
      } catch (err) {
        setError('Failed to load contest data');
        setLoading(false);
      }
    };

    fetchContest();
  }, [contestId]);

  if (loading) return <div id="loading32">Loading...</div>;
  if (error) return <div id="error32">{error}</div>;

  const { contestTitle, questions } = contest;

  const isDailyChallenge = (createdAt) => {
    const today = new Date();
    const createdDate = new Date(createdAt);
    return today.toDateString() === createdDate.toDateString();
  };

  return (
    <div id="container32" className="container">
      <h2 id="contest-title32" className="contest-title">{contestTitle}</h2>
      
      <div id="contest-box32" className="contest-box">
        <div id="header-row32" className="header-row">
          <div id="status-header32">Status</div>
          <div id="title-header32">Title</div>
          <div id="solution-header32">Solution</div>
          <div id="acceptance-header32">Acceptance</div>
          <div id="difficulty-header32">Difficulty</div>
        </div>

        {questions.map((question) => (
          <div key={question._id} id={`question-row${question._id}32`} className="question-row">
            <div id={`status-icon${question._id}32`} className="status-icon">
              {question.solvedBy.length > 0 ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaCalendarAlt className="text-gray-400" />
              )}
            </div>
            <div id={`title${question._id}32`} className="title truncate">
              <Link to={`/contest/${contestId}/${question._id}`} className="text-blue-400 hover:underline">
                {question.title}
              </Link>
              {isDailyChallenge(question.createdAt) && (
                <span id={`daily-challenge${question._id}32`} className="daily-challenge">Daily Challenge</span>
              )}
            </div>
            <div id={`solution-icon${question._id}32`} className="solution-icon">
              <FaLock className="text-purple-500 cursor-pointer" />
            </div>
            <div id={`acceptance${question._id}32`} className="acceptance">
              {Math.round((question.successCount / question.submissionCount) * 100) || 0}%
            </div>
            <div id={`difficulty${question._id}32`} className={`difficulty ${getDifficultyColor(question.difficulty)}`}>
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

export default ContestDetails;
