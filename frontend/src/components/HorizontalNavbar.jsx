import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    
      <nav className="bg-gray-800 p-4 text-white flex justify-between">
        <div className="text-xl font-bold">Dashboard</div>
        <div className="space-x-4">
          <a href="/profile" className="hover:text-gray-300">Profile</a>
          <a href="/studymaterials" className="hover:text-gray-300">Study Materials</a>
          <a href="/quiz" className="hover:text-gray-300">QuizPage</a>
          <a href="/leaderboard" className="hover:text-gray-300">Leaderboard</a>
          <a href="/room" className="hover:text-gray-300">Join Room</a>
          <a href="/mentors" className="hover:text-gray-300">Have Doubt?</a>
        </div>
        <img src={userdata.image} style={{width:"50px",borderRadius:"50%"}}></img>
      </nav> 
    
  );
};

export default HorizontalNavbar;
