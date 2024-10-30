// controllers/userController.js

const User = require('../models/userSchema'); // Import the User model

// Update timetable entry
exports.updateTimetable = async (req, res) => {
  const { email } = req.params;
  const { day, subject, location, time } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Locate the timetable entry for the specified day
    const dayIndex = user.timetable.findIndex((entry) => entry.day === day);
    if (dayIndex === -1) {
      return res.status(400).json({ error: 'Invalid day' });
    }

    // Update the specific class details in the day's timetable
    const classIndex = user.timetable[dayIndex].classes.findIndex((classInfo) => classInfo.subject === subject);
    if (classIndex === -1) {
      return res.status(400).json({ error: 'Class not found for this subject' });
    }

    // Update class details
    user.timetable[dayIndex].classes[classIndex] = {
      subject,
      location,
      time,
    };

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Timetable updated successfully', timetable: user.timetable });
  } catch (error) {
    console.error('Error updating timetable:', error);
    res.status(500).json({ error: 'Failed to update timetable' });
  }
};
