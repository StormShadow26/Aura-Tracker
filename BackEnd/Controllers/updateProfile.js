// step 1
const User = require('../models/userSchema'); 

// step 2
const updateProfile = async (req, res) => {
  const { email } = req.params;
  const { name, yearOfStudy, timetable } = req.body;

  try {
    // step 3 -this may require further changes
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        name,
        yearOfStudy,
       
    
        
        timetable,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // step 4
    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

module.exports = {
    updateProfile
};
