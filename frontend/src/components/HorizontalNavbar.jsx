
import React from 'react';

const HorizontalNavbar = () => (
  <nav className="bg-gray-800 p-4 text-white flex justify-between">
    <div className="text-xl font-bold">Dashboard</div>
    <div className="space-x-4">
      <a href="/profile" className="hover:text-gray-300">Profile</a>
      <a href="#" className="hover:text-gray-300">Reports</a>
      <a href="#" className="hover:text-gray-300">Settings</a>
    </div>
  </nav>
);

export default HorizontalNavbar;
