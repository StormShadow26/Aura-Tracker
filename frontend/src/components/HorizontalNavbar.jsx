
import React from 'react';

const HorizontalNavbar = () => (
  <nav className="bg-gray-800 p-4 text-white flex justify-between">
    <div className="text-xl font-bold">Dashboard</div>
    <div className="space-x-4">
      <a href="/profile" className="hover:text-gray-300">Profile</a>
      <a href="/studymaterials" className="hover:text-gray-300">Study Materials</a>
      <a href="/leaderboard" className="hover:text-gray-300">Leaderboard</a>
      <a href="/quiz" className="hover:text-gray-300">Quiz</a>
    </div>
  </nav>
);

export default HorizontalNavbar;
