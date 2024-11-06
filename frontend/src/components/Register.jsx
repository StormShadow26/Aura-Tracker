import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tire from './Tire'; // Import the Tire component
import './Register.css'; // Import styles for the Register component
import googleLogo from './google.png';

const Register = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [department, setDepartment] = useState('');
  const [college, setCollege] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(false);
    setDirection('');
  }, []);

  const loginWithGoogle = () => {
    setDirection('right');
    setIsLoading(true);
    setTimeout(() => {
      window.open("http://localhost:4000/auth/google/callback", "_self");
    }, 500);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setDirection('left');
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(email);
        setTimeout(() => {
          navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
        }, 500);
      } else {
        setError(data.message || 'Registration failed, please try again');
        setIsLoading(false);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    setDirection('left');
    setIsLoading(true);
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  return (
    <div id="register-container6" className={isLoading ? 'blur' : ''}>
      <Tire isVisible={isLoading} direction={direction} />
      <div id="register-card6">
        <h2 id="register-title6">Register</h2>

        {error && <p id="error-message6">{error}</p>}

        <form id="register-form6" onSubmit={handleRegister}>
          {/* Left Column */}
          <div className="column-left">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year of Study</label>
              <select
                id="year"
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                required
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
              </select>
            </div> 
          </div>

          {/* Right Column */}
          <div className="column-right">
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="college">College Name</label>
              <input
                type="text"
                id="college"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="[0-9]{10}"
              />
            </div>
          </div> 
          
          <button type="submit" id="register-button">
            Register
          </button>
        </form>
        
        <button onClick={loginWithGoogle} id="google-button" className="google-button">
          <img src={googleLogo} alt="Google Logo" className="google-logo" />
          Continue With Google
        </button>

        <p id="register-footer">
          Already have an account?{' '}
          <span onClick={handleLoginClick} style={{ cursor: 'pointer', color: '#f54291' }}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
