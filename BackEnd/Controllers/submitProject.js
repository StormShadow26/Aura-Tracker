// step 1
const Project = require('../models/projectSchema');
const User = require('../models/userSchema'); 

// step 2
const submitProject = async (req, res) => {
  try {
    const { email, projectNumber } = req.body;

    // step 3
    const project = await Project.findOneAndUpdate(
      { email: email, projectNumber: projectNumber },
      { submitted: true },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    // step 4
    await User.findOneAndUpdate(
      { email: email },
      { $inc: { 'projects.completed': 1 } }
    );

    res.status(200).json({ message: 'Project submitted successfully', project });
  } catch (error) {
    console.error('Error submitting project:', error);
    res.status(500).json({ error: 'Server error. Could not submit project.' });
  }
};

module.exports = { submitProject };
