const User = require('../models/userSchema'); 

// Increment auraPoints
exports.incrementAuraPoints = async (req, res) => {
  try {
    const { email, incrementValue } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email });  // Corrected here

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Increment the auraPoints by the given value
    user.auraPoints += incrementValue;

    // Save the updated user data
    await user.save();

    return res.status(200).json({ message: 'Aura points updated successfully', auraPoints: user.auraPoints });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred', error });
  }
};
