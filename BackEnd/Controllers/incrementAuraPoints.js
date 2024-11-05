// step 1 import required schema
const User = require('../models/userSchema'); 

// step 2 get email and incre val 
exports.incrementAuraPoints = async (req, res) => {
  try {
    const { email, incrementValue } = req.body;

    //step 3  Find user by email
    const user = await User.findOne({ email: email });  // Corrected here

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // step 4
    user.auraPoints += incrementValue;

    // step 5
    await user.save();

    return res.status(200).json({ message: 'Aura points updated successfully', auraPoints: user.auraPoints });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred', error });
  }
};
