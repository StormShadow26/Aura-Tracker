// Tire.jsx
import React from 'react';
import './Tire.css'; // Import styles for the Tire component

const Tire = ({ isVisible, direction }) => {
  return (
    <div className={`tire-container ${isVisible ? 'visible' : ''} ${direction === 'left' ? 'to-left' : direction === 'right' ? 'to-right' : ''}`}>
      <img src="tire.png" alt="Tire" className="tire" />
    </div>
  );
};

export default Tire;
