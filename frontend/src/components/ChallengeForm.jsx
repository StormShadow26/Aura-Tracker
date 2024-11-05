import React, { useState } from "react";

const ChallengeForm = ({ onChallengeCreate }) => {
  const [opponent, setOpponent] = useState("");
  const [challengeType, setChallengeType] = useState("Chapter");
  const [goal, setGoal] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const challenge = { opponent, challengeType, goal };
    await onChallengeCreate(challenge);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={opponent} onChange={(e) => setOpponent(e.target.value)} placeholder="Opponent ID" required />
      <select value={challengeType} onChange={(e) => setChallengeType(e.target.value)}>
        <option value="Chapter">Chapter</option>
        <option value="Quiz">Quiz</option>
      </select>
      <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Goal" required />
      <button type="submit">Challenge</button>
    </form>
  );
};

export default ChallengeForm;
