import React, { useState, useContext,useEffect } from "react";
import axios from "axios";
import { EmailContext } from "../contexts/EmailContext";
import "./Friends.css"; 

const Friends = () => {
  const { email } = useContext(EmailContext);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [problemId, setProblemId] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Fetch friends (same as before)
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/friends?email=${encodeURIComponent(email)}`
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

  // Handle Challenge button click
  const handleChallengeClick = (friend) => {
    setSelectedFriend(friend);
    setShowPrompt(true);  // Show the prompt to enter problem ID
  };

  // Send problem ID to backend and trigger email
  const sendChallenge = async () => {
    try {
      if (problemId.trim()) {
        const response = await axios.post("http://localhost:4000/api/v1/challenge", {
          problemId,
          email: selectedFriend.email,
        });
        alert("Challenge sent successfully!");
        setShowPrompt(false); // Close the prompt
        setProblemId(""); // Reset problem ID
      } else {
        alert("Please enter a valid problem ID.");
      }
    } catch (error) {
      console.error("Error sending challenge:", error);
      alert("Failed to send challenge");
    }
  };

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
                  <br />
                  <strong>Student ID:</strong> {friend.identifier}
                  <div>
                    <button
                      className="challenge-btn"
                      onClick={() => handleChallengeClick(friend)}
                    >
                      Challenge
                    </button>
                  </div>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No friends found</p>
      )}

      {/* Prompt for Problem ID */}
      {showPrompt && (
        <div className="challenge-modal">
          <h3>Enter Problem ID</h3>
          <input
            type="text"
            value={problemId}
            onChange={(e) => setProblemId(e.target.value)}
            placeholder="Problem ID"
          />
          <button onClick={sendChallenge}>Send Challenge</button>
          <button onClick={() => setShowPrompt(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Friends;
