// controllers/friendController.js
const User = require("../models/userSchema");

const getFriends = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ friends: user.friends });
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports =  getFriends ;
