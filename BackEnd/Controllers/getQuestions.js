const Question = require('../models/questionSchema'); 


exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find(); // Fetches all questions

    res.status(200).json({
      success: true,
      message: 'Questions fetched successfully',
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching questions',
      error: error.message
    });
  }
};


exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id); // Finds question by ID

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Question fetched successfully',
      data: question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching question',
      error: error.message
    });
  }
};
