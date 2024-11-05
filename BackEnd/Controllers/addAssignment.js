
// importing necesarry schema for acessing databse
const Assignment = require('../models/assignmentSchema');
const User = require('../models/userSchema'); 


const addAssignment = async (req, res) => {
  // collecting necessary data
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

    // checking if data is present or not
    if (!assignmentNumber || !subject || !chapter || !deadline || !professorName || !email) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    //increase total assignment in field of user by 1
    const user = await User.findOneAndUpdate(
      { email: email },
      { $inc: { 'assignments.total': 1 } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // creating a newassignment object
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

    // final step
    const savedAssignment = await newAssignment.save();

    res.status(201).json({
      message: 'Assignment created successfully, and total count incremented.',
      assignment: savedAssignment,
    });
  } catch (error) {
    // In case of error
    console.error('Error adding assignment:', error);
    res.status(500).json({ error: 'Server error. Could not add assignment.' });
  }
};

module.exports = { addAssignment };
