
// step -1
const User = require('../models/userSchema'); 


// step 2
const getDashboardData = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // step -3
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    // step -4  constructing the data/object to be sent in frontend
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
      // timetable: user.timetable,
      auraPoints:user.auraPoints,
      department:user.department,
      yearOfStudy:user.yearOfStudy,
      

     
    };
    console.log(user);

    // step 5
    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDashboardData,
};
