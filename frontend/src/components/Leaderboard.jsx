import React, { useEffect, useState } from 'react';

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

    if (loading) return <p className="text-center text-gray-500">Loading leaderboard...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="flex flex-col items-center bg-gradient-to-br from-blue-600 to-indigo-900 min-h-screen text-white px-4 py-8">
            <h1 className="text-5xl font-bold mt-8 mb-10">🏆 Leaderboard 🏆</h1>

            <div className="w-full max-w-3xl shadow-2xl rounded-lg overflow-hidden bg-gray-900 bg-opacity-80 backdrop-blur-md">
                <table className="min-w-full border-collapse border border-gray-700 text-gray-200">
                    <thead>
                        <tr className="bg-indigo-800 bg-opacity-90 text-lg font-semibold text-gray-100">
                            <th className="py-4 px-6 text-left">Rank</th>
                            <th className="py-4 px-6 text-left">Name</th>
                            <th className="py-4 px-6 text-right">Aura Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className={`transition-colors duration-300 ${
                                    index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                                } hover:bg-indigo-600 hover:bg-opacity-75`}
                            >
                                <td className="py-4 px-6 font-medium text-lg">
                                    {index === 0 && <span className="mr-2 text-yellow-500 text-xl">🥇</span>}
                                    {index === 1 && <span className="mr-2 text-gray-300 text-xl">🥈</span>}
                                    {index === 2 && <span className="mr-2 text-yellow-600 text-xl">🥉</span>}
                                    {index > 2 && <span className="font-bold">{index + 1}</span>}
                                </td>
                                <td className="py-4 px-6 text-lg font-semibold">{user.name}</td>
                                <td className="py-4 px-6 text-lg text-right font-bold">
                                    {user.auraPoints !== undefined && user.auraPoints !== null
                                        ? user.auraPoints.toLocaleString()
                                        : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <footer className="mt-10 text-gray-400">
                <p>🌟 Compete. Achieve. Shine. 🌟</p>
            </footer>
        </div>
    );
}

export default Leaderboard;
