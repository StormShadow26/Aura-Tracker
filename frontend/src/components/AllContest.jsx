import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { EmailContext } from '../contexts/EmailContext';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './AllContest.css';

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

      // Display success message with dark theme styling
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Contest entered successfully!',
        background: '#333', // Dark background
        color: '#e5e5e5',   // Light text color
        iconColor: '#4dd0e1', // Vibrant success icon color
        confirmButtonColor: '#1a237e', // Button color
        confirmButtonText: 'Awesome!',
      });

      navigate(`/contest/${contestId}`);
    } catch (error) {
      console.error('Error entering contest:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
        background: '#333', // Dark background
        color: '#e5e5e5',   // Light text color
        iconColor: '#ff5b5b', // Vibrant error icon color
        confirmButtonColor: '#1a237e', // Button color
        confirmButtonText: 'Try Again',
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container21">
      <h2 id="title21">All Contests</h2>

      {contests.map((contest) => (
        <div key={contest._id} className="contestCard21">
          <h3 id="contestTitle21">{contest.contestTitle}</h3>

          <div className="flexRow21">
            <FaCalendarAlt className="infoIcon21" />
            <span className="infoText21 paddingLeft21">Start Date: {new Date(contest.contestDate).toLocaleString()}</span>
          </div>

          <div className="flexRow21">
            <FaClock className="infoIcon21" />
            <span className="infoText21 paddingLeft21">Duration: {contest.duration} minutes</span>
          </div>

          <div className="flexRow21">
            <span className="infoText21">Total Questions: {contest.totalQuestions}</span>
          </div>

          <button
            id="enterButton21"
            onClick={() => handleEnterContest(contest._id)}
            disabled={!isContestActive(contest.contestDate, contest.duration)}
            className={isContestActive(contest.contestDate, contest.duration) ? 'activeButton' : 'inactiveButton'}
          >
            {isContestActive(contest.contestDate, contest.duration) ? 'Enter Contest' : 'Contest Not Active'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllContests;
