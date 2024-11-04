import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MentorList = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('/mentors/all'); // Adjust the endpoint as needed
        setMentors(response.data.mentors);
      } catch (error) {
        console.error('Error fetching mentor data:', error);
      }
    };

    fetchMentors();
  }, []);

  // Helper function to check if a mentor is currently available
  const isMentorAvailable = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    // If the end time is earlier than the start time, it means the availability period crosses midnight
    if (end < start) {
      end.setDate(end.getDate() + 1); // Adjust end date for midnight crossover
    }

    return now >= start && now <= end;
  };

  // Function to handle contacting the mentor via SMS
  const contactMentor = (phoneNumber) => {
    const message = encodeURIComponent('Hello, I would like to connect with you regarding mentorship.');
    const smsUrl = `sms:${phoneNumber}?body=${message}`; // Format for SMS
    window.open(smsUrl); // Open SMS app
  };

  return (
    <div className="mentor-list-container p-4">
      <h2 className="text-2xl font-bold mb-4">Mentor List</h2>
      <div className="grid gap-6">
        {mentors.map((mentor) => {
          const startTime = mentor.availability.startTime.slice(11, 19); // Extract time part
          const endTime = mentor.availability.endTime.slice(11, 19); // Extract time part
          const available = isMentorAvailable(startTime, endTime); // Check availability

          return (
            <div key={mentor._id} className="p-4 border rounded shadow-md">
              <h3 className="text-xl font-semibold">{mentor.name}</h3>
              <p><strong>Fields of Interest:</strong> {mentor.fieldsInterested.join(', ')}</p>
              <p><strong>Availability:</strong> {mentor.availability.startTime} - {mentor.availability.endTime}</p>
              <p><strong>Mentor Points:</strong> {mentor.mentorPoints}</p>
              <p><strong>Phone Number:</strong> {mentor.phoneNumber}</p>
              {available && (
                <button
                  onClick={() => contactMentor(mentor.phoneNumber)}
                  className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Contact Now
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MentorList;
