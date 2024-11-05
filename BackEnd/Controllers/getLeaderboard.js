// step 1
const User = require('../models/userSchema');

const getLeaderboard = async (req, res) => {
    try {
        // step 2 -sort based on descending order
        const users = await User.find().sort({ auraPoints: -1 });
        
        // step -3
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Failed to fetch leaderboard data' });
    }
};

module.exports = { getLeaderboard };
