const {Question }= require('../models/questionSchema'); 

// Controller to add a new question
exports.addQuestion = async (req, res) => {
  try {
    const {
      title,
      description,
      inputFormat,
      outputFormat,
      constraints,
      difficulty,
      tags,
      sampleInputs
      ,output,
    } = req.body;

    // Create new question
    const question = new Question({
      title,
      description,
      inputFormat,
      outputFormat,
      constraints,
      difficulty,
      tags,
      output,
      sampleInputs
    });

    // Save to database
    await question.save();

    res.status(201).json({
      success: true,
      message: 'Question added successfully',
      data: question
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding question',
      error: error.message
    });
  }
};
