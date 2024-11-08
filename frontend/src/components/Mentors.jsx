import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Mentors.css';

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI("AIzaSyBQdsSOFFJrI9Ote5Q293y1npisCLWdC3o");
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
    <div className="page19">
      {/* Mentor List Section */}
      <div id="mentorListContainer19" className="mentor-list-container">
        <h2 id="mentorListTitle19">Mentor List</h2>
        <div id="mentorGrid19" className="mentor-grid">
          {mentors.map((mentor) => {
            const startTime = mentor.availability.startTime.slice(11, 16);
            const endTime = mentor.availability.endTime.slice(11, 16);
            const available = isMentorAvailable(startTime, endTime);

            return (
              <div key={mentor._id} id="mentorCard19" className="mentor-card">
                <h3 className="mentor-name">{mentor.name}</h3>
                <p className="mentor-details">Fields of Interest: {mentor.fieldsInterested.join(', ')}</p>
                <p className="mentor-details">Availability: {startTime} - {endTime}</p>
                <p className="mentor-details">Mentor Points: {mentor.mentorPoints}</p>
                <button
                  onClick={() => contactMentor(mentor.name)}
                  disabled={!available}
                  className={`contact-button ${available ? 'available' : 'unavailable'}`}
                >
                  Contact Now
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gemini Chat Box */}
      <div id="chatBox19" className="chat-box">
        <h2 id="chatTitle19">Chat with Gemini</h2>
        <div id="chatMessages19" className="chat-messages">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="loading">...</div>}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            value={chatInput}
            onChange={handleChatInputChange}
            placeholder="Ask me something..."
            className="chat-input"
          />
          <button onClick={getResponseForGivenPrompt} className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
};

export default MentorList;
