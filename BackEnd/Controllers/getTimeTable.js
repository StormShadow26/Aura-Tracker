// step 1

const User = require('../models/userSchema'); 

//step 2
exports.getTimeTable = async (req, res) => {
  const { email } = req.params;

  try {
    // step 3- find user based on email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

  //  /step 4
    const timetableData = {
      timetable: user.timetable,
    };


      // step 5
      res.status(200).json(timetableData);
  } catch (error) {
    console.error('Error fetching timetable data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
