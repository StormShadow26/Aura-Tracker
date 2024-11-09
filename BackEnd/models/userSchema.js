const mongoose = require("mongoose");

// Assuming other fields are defined here as well
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Student", "Professor"],
  },
  identifier: {
    type: String, // Stores studentId or professionalId
    required: false,
  },
  yearOfStudy: {
    type: String,
  },
  semester: {
    type: String,
  },
  department: {
    type: String,
  },
  college: {
    type: String,
  },
  phone: {
    type: String,
    sparse: true, // Allows multiple null values by indexing only non-null values
    unique: true,
  },
  assignments: {
    done: Number,
    total: Number,
  },
  classes: {
    attended: Number,
    total: Number,
  },
  weeksclasses: {
    attended: Number,
    total: Number,
  },
  auraPoints: {
    type: Number,
  },
  projects: {
    completed: Number,
    total: Number,
  },
  friends: [
    {
      name: String,
      identifier: String,
      email: String,
    },
  ],
  quiz: {
    questionsAttempted: Number,
    questionsCorrect: Number,
  },
  problemSolving: {
    solved: Number,
  },
  contests: {
    given: Number,
  },
  sessions: {
    count: Number,
  },
  AnalysisOfAlgorithms: {
    totalClass: Number,
    attendedClass: Number,
  },
  OperationResearch: {
    totalClass: Number,
    attendedClass: Number,
  },
  ComputerArchitecture: {
    totalClass: Number,
    attendedClass: Number,
  },
  Oops: {
    totalClass: Number,
    attendedClass: Number,
  },
  AutomataTheory: {
    totalClass: Number,
    attendedClass: Number,
  },

  // New fields for OTP verification
  otp: {
    type: String, // The OTP code
  },
  otpExpiresAt: {
    type: Date, // The OTP expiry time
  },
  isVerified: {
    type: Boolean,
    default: false, // Initially false, can be updated after OTP verification
  }
});

module.exports = mongoose.model("User", userSchema);
