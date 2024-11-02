// controllers/projectController.js
const Project = require('../models/projectSchema');
const User = require('../models/userSchema'); 

// Create a new project
exports.addProject = async (req, res) => {
  const { email, projectNumber, title, topic, deadline, supervisorName, description } = req.body;

  try {
    // Validate required fields
    if (!email || !projectNumber || !title || !topic || !deadline || !supervisorName || !description) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Find the user by email and increment the projects.total
    const user = await User.findOneAndUpdate(
      { email: email },
      { $inc: { 'projects.total': 1 } }, // Increment the total projects count
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Create new project
    const newProject = new Project({
      email,
      projectNumber,
      title,
      topic,
      deadline,
      supervisorName,
      description,
      submitted: false,
      createdAt: new Date(),
    });

    // Save project to database
    const savedProject = await newProject.save();

    res.status(201).json({
      message: 'Project created successfully, and total count incremented.',
      project: savedProject,
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Server error. Could not create project.' });
  }
};


