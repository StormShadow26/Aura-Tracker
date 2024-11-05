import React, { useEffect, useState } from "react";

const Challengeboard = () => {
  const [Challengeboard, setChallengeboard] = useState([]);

  useEffect(() => {
    const fetchChallengeboard = async () => {
      const response = await fetch("http://localhost:4000/api/v1/challenges/Challengeboard");
      const data = await response.json();
      setChallengeboard(data);
    };
    fetchChallengeboard();
  }, []);

  return (
    <div>
      <h2>ChallengBoard</h2>
      <ul>
        {Challengeboard.map((challenge) => (
          <li key={challenge._id}>
            {challenge.challenger.displayName} vs {challenge.opponent.displayName} - Winner: {challenge.winner.displayName}
          </li>
        ))}
      </ul>

      <Challengeboard></Challengeboard>
    </div>

  );
};

export default Challengeboard;
