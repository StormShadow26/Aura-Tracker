const User = require('../models/userSchema');

const updateProgress = async (req, res) => {
  const { email } = req.body;
  const { field, value } = req.body;
 


  try {
    const user = await User.findOne({ email });
    

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!['quiz', 'problemSolving', 'contests', 'sessions'].includes(field)) {
      return res.status(400).json({ message: 'Invalid field' });
    }

    switch (field) {
      case 'quiz':
        if (!user.quiz) {
          user.quiz = {};
        }
        user.quiz.questionsAttempted += value.questionsAttempted;
        user.quiz.questionsCorrect += value.questionsCorrect;
        break;
      case 'problemSolving':
        user.problemSolving.solved += value.solved;
        break;
      case 'contests':
        user.contests.given += value.given;
        break;
      case 'sessions':
        user.sessions.count += value.count;
        break;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user progress', error });
  }
};

module.exports = {
  updateProgress,
};