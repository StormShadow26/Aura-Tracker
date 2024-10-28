import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [department, setDepartment] = useState('');
  const [college, setCollege] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          yearOfStudy,
          department,
          college,
          phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to login page upon successful registration
        navigate('/login');
      } else {
        // Show error message if registration fails
        setError(data.message || 'Registration failed, please try again');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/90 text-white">
      <div className="w-full max-w-lg p-8 space-y-6 bg-black/80 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 text-transparent bg-clip-text">
          Register
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-300">Year of Study</label>
            <select
              id="year"
              value={yearOfStudy}
              onChange={(e) => setYearOfStudy(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              <option value="5">5th Year</option>
            </select>
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-300">Department</label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="college" className="block text-sm font-medium text-gray-300">College Name</label>
            <input
              type="text"
              id="college"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="[0-9]{10}"
              className="w-full px-4 py-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-medium text-white bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg hover:scale-105 transform transition-all duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-pink-500 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
