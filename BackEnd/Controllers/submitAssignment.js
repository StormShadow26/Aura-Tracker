// controllers/assignmentController.js
const Assignment = require('../models/assignmentSchema');
const User = require('../models/userSchema'); // Ensure this path is correct

// Mark assignment as submitted
const submitAssignment = async (req, res) => {
  try {
    const { email, assignmentNumber } = req.body;

    // Find the assignment and update its submitted status
    const assignment = await Assignment.findOneAndUpdate(
      { email: email, assignmentNumber: assignmentNumber },
      { submitted: true },
      { new: true }
    );

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found.' });
    }

    // Increment the assignments.done for the user
    await User.findOneAndUpdate(
      { email: email },
      { $inc: { 'assignments.done': 1 } }
    );

    res.status(200).json({ message: 'Assignment submitted successfully', assignment });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).json({ error: 'Server error. Could not submit assignment.' });
  }
};

module.exports = { submitAssignment };
