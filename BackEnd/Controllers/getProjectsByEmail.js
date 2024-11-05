// step 1
const Project = require('../models/projectSchema');

// step 2 get email
const getProjectsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // step 3 find projects 
    const projects = await Project.find({ email });

    if (!projects.length) {
      return res.status(404).json({ message: 'No projects found for this email.' });
    }

    // step 4 return the data 
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects by email:', error);
    res.status(500).json({ error: 'Server error. Could not fetch projects.' });
  }
};

module.exports = { getProjectsByEmail };
