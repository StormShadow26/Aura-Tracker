import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailContext } from "../contexts/EmailContext";
import './Login.css'; 

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { setEmail: setEmails } = useContext(EmailContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmails(email);
        localStorage.setItem('userEmail', email);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed, please try again');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div id="login1-container">
      <div id="login1-card">
        <h2 id="login1-title">Login</h2>

        {error && <p id="error-message1">{error}</p>}

        <form onSubmit={handleLogin} id="login1-form">
          <div className="form1-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form1-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" id="login1-button">
            Log In
          </button>
        </form>

        <p id="login1-footer">
          Don't have an account?{' '}
          <a href="/register" id="register-link">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
