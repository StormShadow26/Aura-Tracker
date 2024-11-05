import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HorizontalNavbar.css';
import user from './user.png';

const HorizontalNavbar = () => {
  const [userdata, setUserdata] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/register/sucess", {
        withCredentials: true,
      });
      console.log("response:", response);
      setUserdata(response.data.user);
    } catch (error) {
      console.log(error);
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
        <a id="profile-button5" href="/profile" className="navbar-button5">Profile</a>
        <a id="study-materials-button5" href="/studymaterials" className="navbar-button5">Study Materials</a>
        <a id="settings-button5" href="#" className="navbar-button5">Settings</a>
      </div>
      {/* <img id="user-image" src={userdata.image} alt="User" className="user-image" /> */}
      <img src={user} alt="user" className="user-logo" />
    </nav>
    
      <nav className="bg-gray-800 p-4 text-white flex justify-between">
        <div className="text-xl font-bold">Dashboard</div>
        <div className="space-x-4">
          <a href="/profile" className="hover:text-gray-300">Profile</a>
          <a href="/studymaterials" className="hover:text-gray-300">Study Materials</a>
          <a href="/quiz" className="hover:text-gray-300">QuizPage</a>
          <a href="/leaderboard" className="hover:text-gray-300">Leaderboard</a>
          <a href="/room" className="hover:text-gray-300">Join Room</a>
          <a href="/mentors" className="hover:text-gray-300">Have Doubt?</a>
          <a href="/compete" className="hover:text-gray-300">Challenge</a>
        </div>
      </nav> </div>
    
  );
};

export default HorizontalNavbar;
