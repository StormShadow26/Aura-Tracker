<<<<<<< Updated upstream
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ onSuccess }) => {
  // const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [yearOfStudy, setYearOfStudy] = useState('');
  // const [department, setDepartment] = useState('');
  // const [college, setCollege] = useState('');
  // const [phone, setPhone] = useState('');
=======
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
>>>>>>> Stashed changes
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState('');
  const navigate = useNavigate();

<<<<<<< Updated upstream
  const loginWithgoogle = () => {
    window.open("http://localhost:4000/auth/google/callback", "_self");
  };
  const handleRegister = async (e) => {
    e.preventDefault();
=======
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
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        setError(data.message || "Registration failed, please try again");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };
=======
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
>>>>>>> Stashed changes

  return (
    <div id="register-container" className={isLoading ? 'blur' : ''}>
      <Tire isVisible={isLoading} direction={direction} />
      <div id="register-card">
        <h2 id="register-title">Register</h2>

        {error && <p id="error-message">{error}</p>}

<<<<<<< Updated upstream
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-medium text-white bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg hover:scale-105 transform transition-all duration-300"
          >
            Register
          </button>
        </form>

        <button
          onClick={loginWithgoogle}
          className="w-full py-3 font-medium text-white bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg hover:scale-105 transform transition-all duration-300"
        >
          Continue With Google
        </button>

        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-pink-500 hover:underline">
=======
        <form id="register-form" onSubmit={handleRegister}>
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
        </form>

        <button type="submit" id="register-button" onClick={handleRegister}>
          Register
        </button>
        
        <button onClick={loginWithGoogle} id="google-button" className="google-button">
          <img src={googleLogo} alt="Google Logo" className="google-logo" />
          Continue With Google
        </button>

        <p id="register-footer">
          Already have an account?{' '}
          <span onClick={handleLoginClick} style={{ cursor: 'pointer', color: '#f54291' }}>
>>>>>>> Stashed changes
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
