import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaCalendarAlt, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const { contestTitle, questions } = contest;

  // Function to check if the question was created today
  const isDailyChallenge = (createdAt) => {
    const today = new Date();
    const createdDate = new Date(createdAt);
    return today.toDateString() === createdDate.toDateString();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-blue-600 mb-4">{contestTitle}</h2>
      
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
              <Link to={`/contest/${contestId}/${question._id}`} className="text-blue-400 hover:underline">
                {question.title}
              </Link>
              {isDailyChallenge(question.createdAt) && (
                <span className="ml-2 text-sm text-yellow-400">Daily Challenge</span>
              )}
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

export default ContestDetails;
