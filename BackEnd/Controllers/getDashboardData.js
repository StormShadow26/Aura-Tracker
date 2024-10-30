const User = require('../models/userSchema'); 

// Controller function to fetch user data for the dashboard
const getDashboardData = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Fetch the user data from the database using the email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Construct the data to send back to the frontend
    const dashboardData = {
      classes: {
        attended: user.classes.attended,
        total: user.classes.total,
      },
      assignments: {
        done: user.assignments.done,
        total: user.assignments.total,
      },
      projects: {
        completed: user.projects.completed,
        total: user.projects.total,
      },
      timetable: user.timetable,
      auraPoints:user.auraPoints,
    };

    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDashboardData,
};
