import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { EmailContext } from '../contexts/EmailContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import tireImage from './Tire.png'; // Update path to your tire image
import './QuizPage.css';

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [limit, setLimit] = useState(10);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const { email } = useContext(EmailContext);

  // Timer states
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `https://quizapi.io/api/v1/questions?apiKey=n0rkfZHQ4nMZblRBODKOUSWv3sp4nv2udtfDOX9s&limit=${limit}&category=${category}&difficulty=${difficulty}`
      );
      setQuestions(response.data);

      const totalTime = limit * 30; // 30 seconds per question
      setTimeLeft(totalTime);
      setTimerStarted(true);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch questions. Please try again.', 'error');
    }
  };

  useEffect(() => {
    if (!timerStarted || timeLeft <= 0) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          calculateScore();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timerStarted, timeLeft]);

  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = async () => {
    let currentScore = 0;

    questions.forEach((question) => {
      const correctAnswers = question.correct_answers;
      const userAnswer = userAnswers[question.id];
      if (userAnswer && correctAnswers[`answer_${userAnswer}_correct`] === "true") {
        currentScore += 1;
      }
    });

    setScore(currentScore);

    try {
      
      await axios.post(`http://localhost:4000/api/v1/updateProgress`, {
        email: email,
        field: 'quiz',
        value: {
          questionsAttempted: questions.length, 
          questionsCorrect: currentScore 
        }
      });

      const incrementValue = currentScore - questions.length / 2;
        await axios.post('http://localhost:4000/api/v1/increment-aura-points', {
                email: email,
                incrementValue: incrementValue,
        });

      if (currentScore > questions.length - 4 && currentScore > 0) {
        Swal.fire({
          title: 'Yayyy! 🎉',
          text: `Congrats! You scored ${currentScore}. You gained ${incrementValue} aura points.`,
          imageUrl: tireImage,
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: 'Tire Icon',
          // icon: 'success',
          customClass: {
            popup: 'custom-popup' // Link to the custom CSS class
          },
          showCancelButton: true,
          confirmButtonText: 'Generate Referral Code',
        }).then((result) => {
          if (result.isConfirmed) {
            generateReferralCode();
          }
        });
      } else {
        Swal.fire(
          'Success!',
          `You gained ${incrementValue} aura points.`,
          'success'
        );
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update aura points. Please try again.', 'error');
    }
  };

  const generateReferralCode = () => {
    const shouldGiveCode = Math.random() < 0.5;

    if (shouldGiveCode) {
      const referralCode = ` REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      Swal.fire({
        title: 'Yayyy! Congratulations!',
        text: `Here is your referral code: ${referralCode}`,
        // icon: 'success',
        customClass: {
          popup: 'custom-popup' // Apply the custom neon popup style here as well
        },
      });
    } else {
      Swal.fire({
        title: 'Better Luck Next Time!',
        text: 'Work harder to get a referral code next time!',
        icon: 'info',
        customClass: {
          popup: 'custom-popup'
        }
      });
    }
  };

  return (
    <div id="quiz-container17">
      <h1 id="quiz-title17">📝 Quiz Time</h1>

      <div id="settings-panel17">
        <label htmlFor="category-select17" className="label17">Category:</label>
        <select
          id="category-select17"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a Category</option>
          <option value="Linux">Linux</option>
          <option value="DevOps">DevOps</option>
          <option value="Networking">Networking</option>
          <option value="Programming">Programming (PHP, JS, Python, etc.)</option>
          <option value="Cloud">Cloud</option>
          <option value="Docker">Docker</option>
          <option value="Kubernetes">Kubernetes</option>
          <option value="Others">And lots more...</option>
        </select>

        <label htmlFor="difficulty-select17" className="label17">Difficulty:</label>
        <select
          id="difficulty-select17"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Any</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <label htmlFor="question-number17" className="label17">Number of Questions:</label>
        <input
          id="question-number17"
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          placeholder="e.g., 5, 10"
        />

        <button id="start-quiz-btn17" onClick={fetchQuestions}>
          Start Quiz
        </button>
      </div>

      <div id="timer-display17">
        Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
      </div>

      <div id="questions-container17">
        {questions.map((question, index) => (
          <div key={question.id} className="question-card17">
            <p className="question-text17">Q{index + 1}: {question.question}</p>
            <div className="answers17">
              {Object.entries(question.answers).map(([key, answer]) => (
                answer && (
                  <label key={key} className="answer17">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={key.slice(-1)}
                      onChange={() => handleAnswerSelect(question.id, key.slice(-1))}
                    />
                    {answer}
                  </label>
                )
              ))}
            </div>
          </div>
        ))}
      </div>

      {questions.length > 0 && (
        <button id="submit-quiz-btn17" onClick={calculateScore}>
          Submit Quiz
        </button>
      )}

      {score !== null && (
        <p id="score-display17">Your Score: {score} / {questions.length}</p>
      )}

      <Link to="/dashboard" id="back-btn17">Back to Dashboard</Link>
    </div>
  );
}

export default QuizPage;