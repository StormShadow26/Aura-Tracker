const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    // Note: Password should be hashed before storing in production
  },
  yearOfStudy: {
    type: String,
    enum: ['1', '2', '3', '4', '5'],
  },
  department: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  college: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  phone: {
    type: String,
    unique: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  assignments: {
    done: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  classes: {
    attended: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  weeksclasses: {
    attended: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  projects: {
    completed: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  timetable: [
    {
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true,
      },
      classes: [
        {
          subject: {
            type: String,
            required: true,
          },
          time: {
            start: {
              type: String, // You can use Date for a full timestamp or String for just time (e.g., '09:00 AM')
              required: true,
            },
            end: {
              type: String,
              required: true,
            },
          },
          location: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],

  otp: String,
  otpExpiresAt: Date,
  isVerified: { type: Boolean, default: false }
  
});

module.exports = mongoose.model('User', userSchema);
