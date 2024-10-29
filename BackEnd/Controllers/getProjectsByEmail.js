// controllers/projectController.js
const Project = require('../models/projectSchema');

// Get projects by email
const getProjectsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Find all projects associated with the given email
    const projects = await Project.find({ email });

    if (!projects.length) {
      return res.status(404).json({ message: 'No projects found for this email.' });
    }

    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects by email:', error);
    res.status(500).json({ error: 'Server error. Could not fetch projects.' });
  }
};

module.exports = { getProjectsByEmail };
