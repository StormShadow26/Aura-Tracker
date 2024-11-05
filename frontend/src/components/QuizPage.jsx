import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { EmailContext } from '../contexts/EmailContext';
import axios from 'axios';
import Swal from 'sweetalert2';

function QuizPage() {
    const [questions, setQuestions] = useState([]);
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [limit, setLimit] = useState(10);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const { email } = useContext(EmailContext);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(
                `https://quizapi.io/api/v1/questions?apiKey=n0rkfZHQ4nMZblRBODKOUSWv3sp4nv2udtfDOX9s&limit=${limit}&category=${category}&difficulty=${difficulty}`
            );
            setQuestions(response.data);
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch questions. Please try again.', 'error');
        }
    };

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
            const incrementValue = currentScore - questions.length / 2;
            await axios.post('http://localhost:4000/api/v1/increment-aura-points', {
                email: email,
                incrementValue: incrementValue,
            });
            Swal.fire(
                'Success!',
                `You gained ${incrementValue} aura points.`,
                'success'
            );
        } catch (error) {
            Swal.fire('Error', 'Failed to update aura points. Please try again.', 'error');
        }
    };

    return (
        <div className="quiz-container bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen p-8 flex flex-col items-center">
            <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600">
                📝 Quiz Time
            </h1>

            <div className="settings-panel mb-10 p-6 bg-gray-700 rounded-xl shadow-lg max-w-md w-full">
                <label className="block text-lg font-medium text-indigo-300 mb-2">Category:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input-field mb-4 w-full p-3 rounded-lg bg-gray-800 text-indigo-100 border border-gray-600"
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

                <label className="block text-lg font-medium text-indigo-300 mb-2">Difficulty:</label>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="input-field mb-4 w-full p-3 rounded-lg bg-gray-800 text-indigo-100 border border-gray-600"
                >
                    <option value="">Any</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>

                <label className="block text-lg font-medium text-indigo-300 mb-2">Number of Questions:</label>
                <input
                    type="number"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    className="input-field mb-6 w-full p-3 rounded-lg bg-gray-800 text-indigo-100 border border-gray-600"
                    placeholder="e.g., 5, 10"
                />

                <button
                    onClick={fetchQuestions}
                    className="fetch-btn w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-lg text-lg font-semibold shadow-md"
                >
                    Start Quiz
                </button>
            </div>

            <div className="questions-container w-full max-w-2xl mt-8 space-y-6">
                {questions.map((question, index) => (
                    <div key={question.id} className="question-card p-6 rounded-xl shadow-lg bg-gray-800">
                        <p className="text-xl font-semibold mb-4 text-indigo-200">Q{index + 1}: {question.question}</p>
                        <div className="answers space-y-3">
                            {Object.entries(question.answers).map(([key, answer]) => (
                                answer && (
                                    <label key={key} className="answer bg-gray-900 p-3 rounded-lg text-lg font-medium text-indigo-100 border border-indigo-500 flex items-center">
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={key.slice(-1)}
                                            onChange={() => handleAnswerSelect(question.id, key.slice(-1))}
                                            className="mr-3"
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
                <button
                    onClick={calculateScore}
                    className="submit-btn mt-10 px-8 py-4 bg-green-600 text-white rounded-lg text-lg font-semibold"
                >
                    Submit Quiz
                </button>
            )}

            {score !== null && (
                <p className="score-display mt-8 text-2xl font-semibold text-indigo-300">
                    Your Score: {score} / {questions.length}
                </p>
            )}

            <Link to="/dashboard" className="back-btn mt-8 px-6 py-3 bg-blue-600 rounded-lg text-lg font-semibold text-white shadow-md">
                Back to Dashboard
            </Link>
        </div>
    );
}

export default QuizPage;
