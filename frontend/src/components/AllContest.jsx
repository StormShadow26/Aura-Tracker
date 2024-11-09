import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { EmailContext } from '../contexts/EmailContext';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AllContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { email } = useContext(EmailContext); // Get email from context
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/getcontests');
        setContests(response.data.contests);
        setLoading(false);
      } catch (err) {
        setError('Failed to load contests');
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const isContestActive = (contestDate, duration) => {
    const startDate = new Date(contestDate);
    const endDate = new Date(startDate.getTime() + duration * 60000); // Duration in minutes
    const now = new Date();

    return now >= startDate && now <= endDate;
  };

  const handleEnterContest = async (contestId) => {
    try {
      // Update contests progress on the server
      await axios.post(`http://localhost:4000/api/v1/updateProgress`, {
        email: email, // Use email from context
        field: 'contests',
        value: {
          given: 1,
        },
      });

      // Display success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Contest entered successfully!',
      });

      navigate(`/contest/${contestId}`);
    } catch (error) {
      console.error('Error entering contest:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-5">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">All Contests</h2>

      {contests.map((contest) => (
        <div key={contest._id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-indigo-600 mb-2">{contest.contestTitle}</h3>

          <div className="flex items-center text-gray-600 mb-1">
            <FaCalendarAlt className="mr-2" />
            <span>Start Date: {new Date(contest.contestDate).toLocaleString()}</span>
          </div>

          <div className="flex items-center text-gray-600 mb-1">
            <FaClock className="mr-2" />
            <span>Duration: {contest.duration} minutes</span>
          </div>

          <div className="flex items-center text-gray-600 mb-2">
            <span>Total Questions: {contest.totalQuestions}</span>
          </div>

          <button
            onClick={() => handleEnterContest(contest._id)}
            disabled={!isContestActive(contest.contestDate, contest.duration)}
            className={`px-4 py-2 mt-3 font-semibold text-white rounded-lg ${
              isContestActive(contest.contestDate, contest.duration)
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isContestActive(contest.contestDate, contest.duration) ? 'Enter Contest' : 'Contest Not Active'}
          </button>
        </div>
      ))}
    </div>
  );
};
export default AllContests;