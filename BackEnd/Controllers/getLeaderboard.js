// controllers/leaderboardController.js
const User = require('../models/userSchema');

const getLeaderboard = async (req, res) => {
    try {
        
        const users = await User.find().sort({ auraPoints: -1 });
        
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Failed to fetch leaderboard data' });
    }
};

module.exports = { getLeaderboard };
