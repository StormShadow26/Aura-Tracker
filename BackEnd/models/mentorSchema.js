const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fieldsInterested: {
    type: [String], // Array to store multiple fields of interest
    required: true,
  },
  availability: {
    startTime: {
      type: Date, // Stores the start time as a Date object
      required: true,
    },
    endTime: {
      type: Date, // Stores the end time as a Date object
      required: true,
    },
  },
  mentorPoints: {
    type: Number,
    default: 0, // Default points if not provided
  },
  phoneNumber: {
    type: String,
    required: true, // Make this required if you want to enforce phone number entry
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation date
  },
});

module.exports = mongoose.model('Mentor', mentorSchema);
