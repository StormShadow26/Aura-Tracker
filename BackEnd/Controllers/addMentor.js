// controllers/mentorController.js
const Mentor = require('../models/mentorSchema'); // Adjust the path if needed

// Function to add a new mentor
const addMentor = async (req, res) => {
  try {
    const { name, fieldsInterested, startTime, endTime, mentorPoints, phoneNumber } = req.body;

    // Create new mentor
    const newMentor = new Mentor({
      name,
      fieldsInterested,
      availability: {
        startTime: new Date(`1970-01-01T${startTime}`), // Expected format: "09:00:00"
        endTime: new Date(`1970-01-01T${endTime}`),     // Expected format: "12:00:00"
      },
      mentorPoints: mentorPoints || 0, // Default to 0 if not provided
      phoneNumber, // Include the phone number
    });

    // Save mentor to database
    await newMentor.save();

    // Respond with success message
    res.status(201).json({ message: 'Mentor added successfully', mentor: newMentor });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error adding mentor', error: error.message });
  }
};

module.exports = {
  addMentor,
};
