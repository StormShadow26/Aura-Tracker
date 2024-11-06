const { Contest, Question } = require('../models/questionSchema');
const mongoose = require('mongoose');

// Controller to create a new contest
 // Import Contest model

const createContest = async (req, res) => {
  try {
    const { contestTitle, contestDate, duration, questions } = req.body;

    // Validate the input data
    if (!contestTitle || !contestDate || !duration || !questions || questions.length === 0) {
      return res.status(400).json({
        message: 'All fields are required. Ensure you provide contest title, date, duration, and questions.'
      });
    }

    // Check if contest date is a valid future date
    if (new Date(contestDate) <= new Date()) {
      return res.status(400).json({
        message: 'Contest date must be a future date.'
      });
    }

    // Create a new contest object
    const contest = new Contest({
      contestTitle,
      contestDate,
      duration,
      questions,
      totalQuestions: questions.length, // Calculate the total number of questions
      isActive: true // Default to active, can change after contest completion
    });

    // Save the contest to the database
    await contest.save();

    // Send a success response with the contest data
    return res.status(201).json({
      message: 'Contest created successfully!',
      contest
    });
  } catch (error) {
    console.error('Error creating contest:', error);
    return res.status(500).json({
      message: 'Internal Server Error. Failed to create contest.',
      error: error.message
    });
  }
};




// Controller to get contests (populate questions if referenced)
const { Contest } = require('../models/questionSchema');  // Import the Contest model

// Controller to get all contests
const getContests = async (req, res) => {
  try {
    const contests = await Contest.find()
      .populate('questions')  // Populate the questions array to include detailed question data
      .exec();

    if (!contests || contests.length === 0) {
      return res.status(404).json({
        message: 'No contests found.',
      });
    }

    return res.status(200).json({
      contests
    });
  } catch (error) {
    console.error('Error fetching contests:', error);
    return res.status(500).json({
      message: 'Internal Server Error. Failed to fetch contests.',
      error: error.message,
    });
  }
};

// Controller to get a single contest by ID
const getContestById = async (req, res) => {
  try {
    const contestId = req.params.id;

    const contest = await Contest.findById(contestId)
      .populate('questions')  // Populate the questions array
      .exec();

    if (!contest) {
      return res.status(404).json({
        message: 'Contest not found.',
      });
    }

    return res.status(200).json({
      contest
    });
  } catch (error) {
    console.error('Error fetching contest by ID:', error);
    return res.status(500).json({
      message: 'Internal Server Error. Failed to fetch contest.',
      error: error.message,
    });
  }
};


module.exports = {
  createContest,
  getContests,
  getContestById
};
