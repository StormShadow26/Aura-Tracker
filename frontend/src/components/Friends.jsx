import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { EmailContext } from "../contexts/EmailContext";
import "./Friends.css"; // Add custom CSS for styling

const Friends = () => {
  const { email } = useContext(EmailContext);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/friends?email=${encodeURIComponent(
            email
          )}`
        );
        setFriends(response.data.friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
        setError("Failed to load friends");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [email]);

  return (
    <div className="friends-container">
      <h2>Your Friends</h2>
      {loading ? (
        <p>Loading friends...</p>
      ) : error ? (
        <p>{error}</p>
      ) : friends.length > 0 ? (
        <div className="friends-list">
          {friends.map((friend, index) => (
            <div className="friend-card" key={index}>
              <div className="friend-info">
                <p>
                  <strong>Name:</strong> {friend.name}
                  <br></br>
                  <strong>Student ID:</strong> {friend.identifier}
                  <div><button className="challenge-btn">Challenge</button></div>
                  
                </p>
              </div>
              
            </div>
          ))}
        </div>
      ) : (
        <p>No friends found</p>
      )}
    </div>
  );
};

export default Friends;
