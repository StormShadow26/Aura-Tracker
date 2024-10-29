// controllers/assignmentController.js
const Assignment = require('../models/assignmentSchema');

// Add a new assignment
const addAssignment = async (req, res) => {
  try {
    const {
      assignmentNumber,
      subject,
      chapter,
      deadline,
      submitted,
      professorName,
      description,
      attachments,
     
      email,
    } = req.body;

    // Validate required fields
    if (!assignmentNumber || !subject || !chapter || !deadline || !professorName  || !email) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Create new assignment
    const newAssignment = new Assignment({
      assignmentNumber,
      subject,
      chapter,
      deadline,
      professorName,
      description,
      attachments,
      
      email,
      submitted: submitted || false,
      createdAt: new Date(),
    });

    // Save assignment to database
    const savedAssignment = await newAssignment.save();

    res.status(201).json({
      message: 'Assignment created successfully.',
      assignment: savedAssignment,
    });
  } catch (error) {
    console.error('Error adding assignment:', error);
    res.status(500).json({ error: 'Server error. Could not add assignment.' });
  }
};

module.exports = { addAssignment };
