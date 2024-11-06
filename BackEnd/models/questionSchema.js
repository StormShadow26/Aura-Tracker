const mongoose = require('mongoose');

// Define the schema for a single question
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  inputFormat: {
    type: String,
    required: true
  },
  outputFormat: {
    type: String,
    required: true
  },
  constraints: {
    type: String
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  tags: {
    type: [String]
  },
  solvedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  sampleInputs: [
    {
      input: String,
      output: String
    }
  ],
  submissionCount: {
    type: Number,
    default: 0
  },
  successCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Define the schema for the CP contest
const contestSchema = new mongoose.Schema({
  contestTitle: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  contestDate: {
    type: Date,
    required: true // Contest date and time
  },
  duration: {
    type: Number,
    required: true, // Duration in minutes
  },
  questions: [questionSchema],  // Embedded question schema
  totalQuestions: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true // Whether the contest is ongoing or completed
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Question = mongoose.model('Question', questionSchema);
const Contest = mongoose.model('Contest', contestSchema);

module.exports = { Question, Contest };
