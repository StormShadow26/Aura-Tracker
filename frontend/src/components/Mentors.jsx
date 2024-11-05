import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/getMentors');
        setMentors(response.data.mentors);
      } catch (error) {
        console.error('Error fetching mentor data:', error);
      }
    };
    fetchMentors();
  }, []);

  const isMentorAvailable = (startTime, endTime) => {
    const now = new Date();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const startTimeInMinutes = startHours * 60 + startMinutes;
    const endTimeInMinutes = endHours * 60 + endMinutes;

    return endTimeInMinutes < startTimeInMinutes
      ? currentTimeInMinutes >= startTimeInMinutes || currentTimeInMinutes <= endTimeInMinutes
      : currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;
  };

  const contactMentor = (mentorName) => {
    navigate(`/room/${mentorName}`);
  };

  const handleChatInputChange = (e) => setChatInput(e.target.value);

  const getResponseForGivenPrompt = async () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { sender: 'user', text: chatInput }]);
      setLoading(true);
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(chatInput);
        setChatMessages((prev) => [...prev, { sender: 'bot', text: result.response.text() }]);
      } catch (error) {
        console.error('Error getting response from Gemini API:', error);
      } finally {
        setLoading(false);
        setChatInput('');
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-6 bg-gray-100 min-h-screen gap-6">
      {/* Mentor List Section */}
      <div className="mentor-list-container w-full lg:w-3/4 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Mentor List</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => {
            const startTime = mentor.availability.startTime.slice(11, 16);
            const endTime = mentor.availability.endTime.slice(11, 16);
            const available = isMentorAvailable(startTime, endTime);

            return (
              <div key={mentor._id} className="mentor-card bg-white p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{mentor.name}</h3>
                <p className="text-gray-600"><strong>Fields of Interest:</strong> {mentor.fieldsInterested.join(', ')}</p>
                <p className="text-gray-600"><strong>Availability:</strong> {startTime} - {endTime}</p>
                <p className="text-gray-600"><strong>Mentor Points:</strong> {mentor.mentorPoints}</p>
                <button
                  onClick={() => contactMentor(mentor.name)}
                  disabled={!available}
                  className={`mt-4 px-4 py-2 rounded-lg transition ${available ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-indigo-500 hover:to-blue-500' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  Contact Now
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gemini Chat Box */}
      <div className="chat-box w-full lg:w-1/4 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Chat with Gemini</h2>
        <div className="chat-messages h-80 overflow-y-auto border border-gray-200 p-4 rounded-lg bg-gray-50 mb-4">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
              <p className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-200 text-blue-900' : 'bg-gray-200 text-gray-900'} max-w-xs`}>
                {msg.text}
              </p>
            </div>
          ))}
          {loading && (
            <div className="text-center mt-2">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
            </div>
          )}
        </div>
        <div className="chat-input flex">
          <input
            type="text"
            value={chatInput}
            onChange={handleChatInputChange}
            placeholder="Ask me something..."
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={getResponseForGivenPrompt}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorList;
