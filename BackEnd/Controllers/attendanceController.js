const User = require('../models/userSchema'); // Adjust path to your User model

// Controller to update attendance
const updateAttendance = async (req, res) => {
  const { email, subject, isAttended } = req.body;
   // Assumes email, subject, and isAttended are passed in the request body
  console.log(req.body);
  try {
    // Find the user by email
    const user = await User.findOne({ email: email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user,"mai hun");

    // Check if the subject is valid
    const validSubjects = [
      'AnalysisOfAlgorithms', 
      'OperationResearch', 
      'ComputerArchitecture', 
      'Oops', 
      'AutomataTheory'
    ];
    
    if (!validSubjects.includes(subject)) {
      return res.status(400).json({ message: "Invalid subject" });
    }

    // Update attendance based on whether the class was attended or missed
    if (isAttended) {
      user[subject].totalClass += 1;
      user[subject].attendedClass += 1;
    
    } else {
      user[subject].totalClass += 1;
    }

    // Save the updated user data
    await user.save();
    
    return res.status(200).json({ message: `${subject} attendance updated successfully`, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error",error });
  }
};

module.exports = { updateAttendance };