const Mentor = require('../models/mentorSchema'); // Adjust the path if needed

// Function to get all mentor data
const getMentors = async (req, res) => {
  try {
    // Retrieve all mentors from the database
    const mentors = await Mentor.find();

    // Respond with the retrieved mentor data
    res.status(200).json({ mentors });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error retrieving mentor data', error: error.message });
  }
};

module.exports = {

  getMentors,
};