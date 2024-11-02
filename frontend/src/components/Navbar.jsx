import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const LoginHandler = () => navigate('/login');
  const RegisterHandler = () => navigate('/register');

  return (
    <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1
              className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 text-transparent bg-clip-text hover:scale-105 transform transition-all cursor-pointer"
              onClick={() => navigate('/')}
            >
              Aura-Tracker
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={LoginHandler}
              className="px-6 py-2 text-sm font-medium text-white border-2 border-pink-500 rounded-lg hover:bg-pink-500/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:scale-105"
            >
              Login
            </button>
            <button
              onClick={RegisterHandler}
              className="px-6 py-2 text-sm font-medium text-white border-2 border-blue-500 rounded-lg hover:bg-blue-500/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:scale-105"
            >
              Register
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <button
              onClick={LoginHandler}
              className="block w-full px-4 py-2 text-sm font-medium text-white border-t border-pink-500 bg-black hover:bg-pink-500/20"
            >
              Login
            </button>
            <button
              onClick={RegisterHandler}
              className="block w-full px-4 py-2 text-sm font-medium text-white border-t border-blue-500 bg-black hover:bg-blue-500/20"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
