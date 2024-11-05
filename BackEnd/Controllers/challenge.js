// routes/challenge.js
const express = require("express");
const router = express.Router();
const Challenge = require("./challenge");

// Create a new challenge
router.post("/create", async (req, res) => {
  try {
    const { challenger, opponent, challengeType, goal } = req.body;
    const newChallenge = new Challenge({ challenger, opponent, challengeType, goal });
    await newChallenge.save();
    res.status(201).json(newChallenge);
  } catch (error) {
    res.status(500).json({ message: "Failed to create challenge" });
  }
});

// Accept a challenge
router.put("/:id/accept", async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(req.params.id, { status: "In Progress" });
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ message: "Failed to accept challenge" });
  }
});

// Complete a challenge
router.put("/:id/complete", async (req, res) => {
  try {
    const { winner } = req.body;
    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      { status: "Completed", winner, endTime: new Date() },
      { new: true }
    );
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ message: "Failed to complete challenge" });
  }
});

// Get leaderboard
router.get("/Challengeboard", async (req, res) => {
  try {
    const leaderboard = await Challenge.find({ status: "Completed" })
      .sort({ endTime: -1 })
      .populate("challenger opponent winner");
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
});

module.exports = router;
