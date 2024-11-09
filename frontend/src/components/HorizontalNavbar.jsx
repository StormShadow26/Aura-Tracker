import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './HorizontalNavbar.css';
import user from './user.png';
import { EmailContext } from '../contexts/EmailContext';

const HorizontalNavbar = () => {
  const [userdata, setUserdata] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { email } = useContext(EmailContext); 

  // Fetch current user data
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/students", {
        withCredentials: true,
      });
      setUserdata(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Search users by name
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/users?name=${searchTerm}`, {
        withCredentials: true,
      });
      const students = response.data.data;
      setSearchResults(students);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  console.log("Email aayi hai:",email);
  // Add friend function using email
  const handleAddFriend = async (identifier) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/v1/add-friend`, {
          identifier: identifier,
          email: email,  // Use email from the fetched userdata
      });

      if (response.status === 200) {
        alert('Friend added successfully!');
      } else {
        alert('Failed to add friend');
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      alert('Error adding friend');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <nav id="horizontal-navbar5" className="navbar5">
        <div id="navbar-title5" className="navbar-title5">Dashboard</div>
        <div id="button-container5" className="button-container5">
          <a id="profile-button5" onClick={() => setIsModalOpen(true)} className="navbar-button5">Search</a>
          <a href="/profile" className="navbar-button5">Profile</a>
          <a href="/studymaterials" className="navbar-button5">Study Materials</a>
          <a href="/quiz" className="navbar-button5">QuizPage</a>
          <a href="/leaderboard" className="navbar-button5">Leaderboard</a>
          <a href="/room" className="navbar-button5">Join Room</a>
          <a href="/mentors" className="navbar-button5">Have Doubt?</a>
          <a href="/compete" className="navbar-button5">Challenge</a>
        </div>
        <img src={user} alt="user" className="user-logo" />
      </nav>

      {/* Search Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Search Modal"
        className="search-modal"
        overlayClassName="search-overlay"
      >
        <h2>Search Users</h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>

        <div className="search-results">
          {searchResults.map((user, index) => (
            <div key={index} className="search-result">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Student ID:</strong> {user.identifier}</p>
              <button onClick={() => handleAddFriend(user.identifier)}>Add Friend</button>
            </div>
          ))}
        </div>

        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default HorizontalNavbar;
