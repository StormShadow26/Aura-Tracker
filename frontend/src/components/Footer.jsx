import React, { useState } from 'react';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <footer className="bg-black/90 backdrop-blur-sm text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="https://www.instagram.com/cc.club.mnnit/" className="hover:text-pink-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://x.com/" className="hover:text-blue-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/computer-coding-club-mnnit/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/StormShadow26/Aura-Tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
          
          <div className="flex space-x-8">
            <button onClick={toggleModal} className="text-sm hover:text-pink-500 transition-colors">About Us</button>
            <a href="https://github.com/StormShadow26/Aura-Tracker"
            target="_blank"
            rel="noopener noreferrer" className="text-sm hover:text-blue-500 transition-colors">Contact</a>
            <a href="#" className="text-sm hover:text-green-500 transition-colors">Terms & Conditions</a>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Aura-Tracker. All rights reserved.
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
          <div className="bg-blue-500 w-1/2 p-8 rounded shadow-lg max-w-lg transform transition-transform duration-300 ease-in-out translate-y-4 opacity-0 animate-fadeInAndSlideUp">
            <h2 className="text-xl font-bold mb-4">Welcome to Aura-Tracker</h2>
            <p>
              Aura-Tracker is a web app that makes it easy to organize your daily or weekly college tasks in a playful manner.
              Simply register and dive into our web app to organize your tasks and earn badges and rewards to showcase on your profile.
            </p>
            <button
              onClick={toggleModal}
              className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
