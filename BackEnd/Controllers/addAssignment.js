// controllers/assignmentController.js
const Assignment = require('../models/assignmentSchema');
const User = require('../models/userSchema'); // Make sure this path is correct

// Add a new assignment
const addAssignment = async (req, res) => {
  try {
    const {
      assignmentNumber,
      subject,
      chapter,
      deadline,
      professorName,
      description,
      email,
    } = req.body;

    // Validate required fields
    if (!assignmentNumber || !subject || !chapter || !deadline || !professorName || !email) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Find the user by email and increment the assignments.total
    const user = await User.findOneAndUpdate(
      { email: email },
      { $inc: { 'assignments.total': 1 } },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Create new assignment
    const newAssignment = new Assignment({
      assignmentNumber,
      subject,
      chapter,
      deadline,
      professorName,
      description,
      email,
      submitted: false,
      createdAt: new Date(),
    });

    // Save assignment to database
    const savedAssignment = await newAssignment.save();

    res.status(201).json({
      message: 'Assignment created successfully, and total count incremented.',
      assignment: savedAssignment,
    });
  } catch (error) {
    console.error('Error adding assignment:', error);
    res.status(500).json({ error: 'Server error. Could not add assignment.' });
  }
};

module.exports = { addAssignment };
