import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HorizontalNavbar.css';
import { Navigate } from 'react-router-dom';
import user from './user.png';

const HorizontalNavbar = () => {
  const [userdata, setUserdata] = useState({});
  // const ImagHanfler=()=>Navigate('/profile')

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
        {/* <a id="settings-button5" href="#" className="navbar-button5">Settings</a> */}
        <a href="/quiz" className="navbar-button5">QuizPage</a>
        <a href="/leaderboard" className="navbar-button5">Leaderboard</a>
        <a href="/room" className="navbar-button5">Join Room</a>
        <a href="/mentors" className="navbar-button5">Have Doubt?</a>
        <a href="/compete" className="navbar-button5">Challenge</a>
      </div>
    
      <img  src={user} alt="user" className="user-logo" /> 
    </nav>
    
    
      </div>
    
  );
};

export default HorizontalNavbar;
