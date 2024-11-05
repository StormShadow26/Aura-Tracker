import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './VerifyOtp.css';

const VerifyOtp = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending OTP verification request for:", { email, otp });
      const response = await fetch("http://localhost:4000/api/v1/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("data is:", data);

      if (response.ok) {
        navigate("/details"); // Redirect on success
      } else {
        setError(data.message || "Verification failed, please try again");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div id="verify-container12" className="flex12 items-center12 justify-center12 min-h-screen12 bg-black/90 text-white">
      <div id="verify-box12" className="w-full max-w-lg p-8 space-y-6 bg-black/80 rounded-lg shadow-lg hover12:shadow-neon-pink12 transition-shadow12 duration-300">
        <h2 id="title12" className="text-4xl font-bold text-center12 bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 text-transparent bg-clip-text">
          Verify OTP
        </h2>

        {error && <p id="error-message12" className="text-red-500 text-center12">{error}</p>}

        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div id="input-group12">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-300">Enter OTP</label>
            <input
              type="text"
              id="otp12"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              pattern="\d{6}"
              className="w-full px-4 py-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            id="verify-button12"
            className="w-full py-3 font-medium text-white bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg hover:scale-105 transform transition-all duration-300"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
