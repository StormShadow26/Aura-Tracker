import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

function Leaderboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/v1/leaderboard');
                if (!response.ok) throw new Error('Failed to fetch leaderboard data');
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p className="loading-text20">Loading leaderboard...</p>;
    if (error) return <p className="error-text20">Error: {error}</p>;

    return (
        <div id="leaderboard-container20">
            <h1 id="leaderboard-title20">🏆 Leaderboard 🏆</h1>

            <div id="podium-container20">
                {users.slice(0, 3).map((user, index) => (
                    <div key={user._id} className={`podium20 podium-${index + 1}`}>
                        <div className="podium-rank20">
                            {index === 1 && <span className="medal20 silver">🥈</span>}
                            {index === 0 && <span className="medal20 gold">🥇</span>}
                            {index === 2 && <span className="medal20 bronze">🥉</span>}
                        </div>
                        <p className="podium-name20">{user.name}</p>
                        <p className="podium-score20">{user.auraPoints?.toLocaleString() || 'N/A'}</p>
                    </div>
                ))}
            </div>

            <div id="leaderboard-table-container20">
                <table id="leaderboard-table20">
                    <thead>
                        <tr id="table-header20">
                            <th className="table-cell20">Rank</th>
                            <th className="table-cell20">Name</th>
                            <th className="table-cell20">Aura Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.slice(3).map((user, index) => (
                            <tr key={user._id} className="table-row20">
                                <td className="table-cell20 rank-cell20">{index + 4}</td>
                                <td className="table-cell20 name-cell20">{user.name}</td>
                                <td className="table-cell20 points-cell20">{user.auraPoints?.toLocaleString() || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <footer id="leaderboard-footer20">
                <p>🌟 Compete. Achieve. Shine. 🌟</p>
            </footer>
        </div>
    );
}

export default Leaderboard;
