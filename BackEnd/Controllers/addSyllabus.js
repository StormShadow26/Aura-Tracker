const Branch = require('../models/branchSchema');

// Function to add a new branch with nested data
const addSyllabus = async (req, res) => {
  try {
    const { branchName, semesters } = req.body;

    // Creating a new branch document with nested semesters, subjects, chapters, and resources
    const newBranch = new Branch({
      branchName,
      semesters,
    });

    // Save the branch to the database
    await newBranch.save();

    res.status(201).json({
      message: 'Branch syllabus added successfully',
      data: newBranch,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to add branch syllabus',
      error: error.message,
    });
  }
};

module.exports = {
  addSyllabus,
};
