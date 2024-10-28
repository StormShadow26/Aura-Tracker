import React from 'react';
import { Sparkles, Brain, Zap } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const HeroPage = () => {
  return (
    <div>
        <Navbar/>
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 top-1/2 right-0 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute w-96 h-96 bottom-0 left-1/3 bg-green-500/20 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 text-transparent bg-clip-text">
              Level Up Your College Game
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Track your productivity, manage your time, and crush your academic goals with the coolest student productivity tool.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all duration-300 hover:scale-105">
              Start Free Trial
            </button>
            <button className="px-8 py-4 text-lg font-medium text-white border-2 border-blue-500 rounded-lg hover:bg-blue-500/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:scale-105">
              Watch Demo
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Smart Tracking</h3>
              <p className="text-gray-400">Automatically track your study sessions and productivity patterns</p>
            </div>
            
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <Brain className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Focus Mode</h3>
              <p className="text-gray-400">Block distractions and stay in your productivity zone</p>
            </div>
            
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <Zap className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Smart Insights</h3>
              <p className="text-gray-400">Get personalized recommendations to boost your productivity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default HeroPage;