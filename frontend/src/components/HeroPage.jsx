import React, { useState } from 'react';
import { Sparkles, Brain, Zap } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import './HeroPage.css';
import googleLogo from './google.png';
import teamImage from './team.jpeg'; // Ensure this path is correct

const HeroPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWatchDemoClick = () => {
    window.open("https://www.canva.com/design/DAGU3FJtxXU/LWObNTd8q4eO32liihgsfA/view?utm_content=DAGU3FJtxXU&utm_campaign=designshare&utm_medium=link&utm_source=editor", "_blank");
  };

  const handleStartTrialClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div id="hero-container">
        {/* Background Elements */}
        <div id="animated-background">
          <div className="bg-circle" id="circle-pink"></div>
          <div className="bg-circle" id="circle-blue"></div>
          <div className="bg-circle" id="circle-green"></div>
        </div>

        {/* Main Content */}
        <div id="content-container2">
          <div id="text-content2">
            <h1 id="hero-title2">Level Up Your College Game</h1>
            <p id="hero-description2">
              Track your productivity, manage your time, and crush your academic goals with the coolest student productivity tool.
            </p>
            <div id="button-container2">
              <button id="start-trial-button2" onClick={handleStartTrialClick}>Start Free Trial</button>
              <button id="watch-demo-button2" onClick={handleWatchDemoClick}>Watch Demo</button>
            </div>
          </div>

          {/* Features */}
          <div id="features-container">
            <div className="feature-card" id="feature-smart-tracking">
              <Sparkles className="feature-icon" />
              <h3 className="feature-title">Smart Tracking</h3>
              <p className="feature-description">Automatically track your study sessions and productivity patterns.</p>
            </div>
            <div className="feature-card" id="feature-focus-mode">
              <Brain className="feature-icon" />
              <h3 className="feature-title">Focus Mode</h3>
              <p className="feature-description">Block distractions and stay in your productivity zone.</p>
            </div>
            <div className="feature-card" id="feature-smart-insights">
              <Zap className="feature-icon" />
              <h3 className="feature-title">Smart Insights</h3>
              <p className="feature-description">Get personalized recommendations to boost your productivity.</p>
            </div>
          </div>
        </div>

        {/* Parallax Image Section */}
        <div className="parallax-image" style={{ backgroundImage: `url(${teamImage})` }}>
        <hr size="0.1" width="2000" color="black"></hr>
        </div>


        {/* Team Section */}
        <section className="team-section">
          <section className="team-heading">
            <h1 className="team-background">TEAM</h1>
            <h2 className="team-foreground">Founder Team</h2>
          </section>
          <div className="team-container">
            {/* Team Member 1 */}
            <div className="team-member">
              <img src={googleLogo} alt="Google Logo" className="google-logo" />
              <h3>Tanishq Gupta</h3>
              <p>Founder (CEO)</p>
              <p>Graduated from Stanford University with a degree in Computer Science...</p>
            </div>
            {/* Team Member 2 */}
            <div className="team-member">
              <img src={googleLogo} alt="Google Logo" className="google-logo" />
              <h3>Aryan Sharma</h3>
              <p>Co-Founder Technical Director (CTO)</p>
              <p>Graduated from Columbia University with a degree in Software Engineering...</p>
            </div>
            {/* Team Member 3 */}
            <div className="team-member">
              <img src={googleLogo} alt="Google Logo" className="google-logo" />
              <h3>Ashish Jha</h3>
              <p>Public Relations Manager</p>
              <p>Graduated from National University of Singapore, Tier 1 investor...</p>
            </div>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div id="modal-overlay">
            <div id="modal-content">
              <h2>Please log in or sign up to explore</h2>
              <button id="close-modal-button" onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HeroPage;
