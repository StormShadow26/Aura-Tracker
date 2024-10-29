// controllers/assignmentController.js
const Assignment = require('../models/assignmentSchema');

// Get assignments by email
const getAssignmentsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Find all assignments associated with the given email
    const assignments = await Assignment.find({ email });

    if (!assignments.length) {
      return res.status(404).json({ message: 'No assignments found for this email.' });
    }

    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error fetching assignments by email:', error);
    res.status(500).json({ error: 'Server error. Could not fetch assignments.' });
  }
};

module.exports = { getAssignmentsByEmail };
