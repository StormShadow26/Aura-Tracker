// controllers/userController.js

const User = require('../models/userSchema'); // Import the User model

// Fetch user data for dashboard with attendance status
exports.getTimeTable = async (req, res) => {
  const { email } = req.params;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentTime = new Date();

    // Update each class with its status: 'ongoing', 'missed', or 'upcoming'
    user.timetable.forEach((daySchedule) => {
      daySchedule.classes.forEach((classInfo) => {
        const startTime = new Date(`1970-01-01T${classInfo.time.start}`);
        const endTime = new Date(`1970-01-01T${classInfo.time.end}`);
        
        if (currentTime >= startTime && currentTime <= endTime) {
          classInfo.status = 'ongoing';
        } else if (currentTime > endTime) {
          classInfo.status = 'missed';
        } else {
          classInfo.status = 'upcoming';
        }
      });
    });

    await user.save();

    const dashboardData = {
      timetable: user.timetable,
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
