const  {Question } = require('../models/questionSchema');

const addSolvedBy = async (req, res) => {
  const { email, timeTaken } = req.body; 
  const questionId = req.params.id; 
  

  console.log(questionId);

  if (!email || !timeTaken) {
    return res.status(400).json({ message: 'Email and timeTaken are required.' });
  }


  if (typeof timeTaken !== 'number' || timeTaken < 0) {
    return res.status(400).json({ message: 'timeTaken must be a valid positive number.' });
  }

  try {
 
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }


    question.solvedBy.push({
      email: email,
      time: timeTaken 
    });

    // Save the updated question
    await question.save();

    return res.status(200).json({
      message: 'Successfully added email and timeTaken to solvedBy.',
      solvedBy: question.solvedBy
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { addSolvedBy };
