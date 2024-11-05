// models/Challenge.js
const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  challenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  opponent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  challengeType: { type: String, enum: ["Chapter", "Quiz"], required: true },
  goal: { type: String, required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Challenge", challengeSchema);
