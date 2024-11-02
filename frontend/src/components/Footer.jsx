import React, { useState } from 'react';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <footer id="footer">
      <div className="container">
        {/* Social Icons */}
        <div id="social-icons" className="social-icons">
          <a href="https://www.instagram.com/cc.club.mnnit/" aria-label="Instagram">
            <Instagram />
          </a>
          <a href="https://x.com/" aria-label="Twitter">
            <Twitter />
          </a>
          <a href="https://www.linkedin.com/company/computer-coding-club-mnnit/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
          <a href="https://github.com/StormShadow26/Aura-Tracker" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <button onClick={toggleModal}>About Us</button>
          <a href="https://github.com/StormShadow26/Aura-Tracker" target="_blank" rel="noopener noreferrer">Contact</a>
          <a href="#">Terms & Conditions</a>
        </div>

        {/* Copyright */}
        <div className="copyright">
          © {new Date().getFullYear()} Aura-Tracker. All rights reserved.
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div id="modal-overlay" onClick={toggleModal}>
          <div id="footer-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-header">Welcome to Aura-Tracker</h2>
            <p className="modal-content">
              Aura-Tracker is a web app that makes it easy to organize your daily or weekly college tasks in a playful manner.
              Simply register and dive into our web app to organize your tasks and earn badges and rewards to showcase on your profile.
            </p>
            <button onClick={toggleModal} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
