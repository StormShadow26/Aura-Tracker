// controllers/userController.js

const User = require('../models/userSchema'); // Import the User model

// Fetch user timetable data for dashboard
exports.getTimeTable = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retrieve and send the timetable data without modifications
    const timetableData = {
      timetable: user.timetable,
    };

    res.status(200).json(timetableData);
  } catch (error) {
    console.error('Error fetching timetable data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
