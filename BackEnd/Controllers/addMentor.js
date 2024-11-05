
// importing necessary schema- step1 
const Mentor = require('../models/mentorSchema');

// getting necessary details- step2
const addMentor = async (req, res) => {
  try {
    const { name, fieldsInterested, startTime, endTime, mentorPoints, phoneNumber } = req.body;

    // creating new object with data -step3
    const newMentor = new Mentor({
      name,
      fieldsInterested,
      availability: {
        startTime: new Date(`1970-01-01T${startTime}`), 
        endTime: new Date(`1970-01-01T${endTime}`),     
      },
      mentorPoints: mentorPoints || 0,
      phoneNumber,
    });

    // Save and send sucesfull message -step4
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
