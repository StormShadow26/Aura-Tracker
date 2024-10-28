import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 text-transparent bg-clip-text hover:scale-105 transform transition-all cursor-pointer">
              Aura-Tracker
            </h1>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <button className="px-6 py-2 text-sm font-medium text-white border-2 border-pink-500 rounded-lg hover:bg-pink-500/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:scale-105">
                Login
              </button>
              <button className="px-6 py-2 text-sm font-medium text-white border-2 border-blue-500 rounded-lg hover:bg-blue-500/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:scale-105">
                Register
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-sm">
            <button className="w-full px-6 py-2 text-sm font-medium text-white border-2 border-pink-500 rounded-lg hover:bg-pink-500/20 transition-all duration-300">
              Login
            </button>
            <button className="w-full px-6 py-2 text-sm font-medium text-white border-2 border-blue-500 rounded-lg hover:bg-blue-500/20 transition-all duration-300">
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;