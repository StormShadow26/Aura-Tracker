// controllers/projectController.js
const Project = require('../models/projectSchema');
const User = require('../models/userSchema'); // Ensure this path is correct

// Mark project as submitted
const submitProject = async (req, res) => {
  try {
    const { email, projectNumber } = req.body;

    // Find the project and update its submitted status
    const project = await Project.findOneAndUpdate(
      { email: email, projectNumber: projectNumber },
      { submitted: true },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    // Increment the projects.done for the user
    await User.findOneAndUpdate(
      { email: email },
      { $inc: { 'projects.done': 1 } }
    );

    res.status(200).json({ message: 'Project submitted successfully', project });
  } catch (error) {
    console.error('Error submitting project:', error);
    res.status(500).json({ error: 'Server error. Could not submit project.' });
  }
};

module.exports = { submitProject };
