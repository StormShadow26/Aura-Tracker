const mongoose = require('mongoose');

// Assuming other fields are defined here as well
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  role: {
    type: String,
    enum: ['Student', 'Professor']
  },
  identifier: {
    type: String, // Stores studentId or professionalId
    required: false
  },
  yearOfStudy: {
    type: String
  },
  semester: {
    type: String
  },
  department: {
    type: String
  },
  college: {
    type: String
  },
  phone: {
    type: String
  },
  assignments: {
    done: Number,
    total: Number
  },
  classes: {
    attended: Number,
    total: Number
  },
  weeksclasses: {
    attended: Number,
    total: Number
  },
  auraPoints: {
    type: Number
  },
  projects: {
    completed: Number,
    total: Number
  },
  quiz: {
    questionsAttempted: Number,
    questionsCorrect: Number
  },
  problemSolving: {
    solved: Number
  },
  contests: {
    given: Number
  },
  sessions: {
    count: Number
  },
  // timetable: [String], // or an array of objects depending on the structure
});

module.exports = mongoose.model('User', userSchema);
