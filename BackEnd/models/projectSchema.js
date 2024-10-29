// models/project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  projectNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  supervisorName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
