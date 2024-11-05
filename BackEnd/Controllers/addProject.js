//step 1-Import the required schema
const Project = require('../models/projectSchema');
const User = require('../models/userSchema'); 

// step-2 getting necessary data and checking all are present 
exports.addProject = async (req, res) => {
  const { email, projectNumber, title, topic, deadline, supervisorName, description } = req.body;
  try {
    
    if (!email || !projectNumber || !title || !topic || !deadline || !supervisorName || !description) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }



  // step -3 findin the req user by email & incre prj cnt
    const user = await User.findOneAndUpdate(
      { email: email },
      { $inc: { 'projects.total': 1 } }, 
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }


    //step 4 Create new project
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


    //step 5- Save project to database & send successful message
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


