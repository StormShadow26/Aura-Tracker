// step 1
const Mentor = require('../models/mentorSchema'); 

const getMentors = async (req, res) => {
  try {
    
    // step 2
    const mentors = await Mentor.find();

    // step -3
    res.status(200).json({ mentors });
  } catch (error) {
    // error aagya guyss
    res.status(500).json({ message: 'Error retrieving mentor data', error: error.message });
  }
};

module.exports = {

  getMentors,
};