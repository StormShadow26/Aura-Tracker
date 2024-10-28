import React from 'react';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/90 backdrop-blur-sm text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-pink-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-green-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
          
          <div className="flex space-x-8">
            <a href="#" className="text-sm hover:text-pink-500 transition-colors">About Us</a>
            <a href="#" className="text-sm hover:text-blue-500 transition-colors">Contact</a>
            <a href="#" className="text-sm hover:text-green-500 transition-colors">Terms & Conditions</a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Aura-Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;