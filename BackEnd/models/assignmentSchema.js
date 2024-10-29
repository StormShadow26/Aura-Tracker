// models/Assignment.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  assignmentNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  chapter: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  submittedAt: {
    type: Date,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
  professorName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  attachments: [
    {
      filename: String,
      url: String,
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming a User model exists
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
