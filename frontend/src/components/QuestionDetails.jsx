import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CodeEditor from './CodeEditor';
import { useOutput } from '../contexts/OutputContext';

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const { output } = useOutput();
  const [timeLeft, setTimeLeft] = useState(900);

  const submitHandler = () => {
    if (question && question.sampleInputs && question.sampleInputs.length > 0) {
      const allOutputsMatch = question.sampleInputs.every(sample => 
        output.trim() === sample.output.trim()
      );

      if (allOutputsMatch) {
        console.log("Question solved successfully!");
      } else {
        console.log("Output does not match the expected result.");
      }
    } else {
      console.log("No sample outputs available for comparison.");
    }

    navigate('/question');
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/getquest/${id}`);
        setQuestion(response.data.data);

        const difficultyTimer = {
          Easy: 300,  
          Medium: 900,
          Hard: 1800,  
        };

        const initialTime = difficultyTimer[response.data.data.difficulty] || 300;
        console.log(initialTime,"initial hun");
        setTimeLeft(initialTime);
        console.log(timeLeft,"timeLeft hun");
      } catch (error) {
        console.error('Error fetching question details:', error);
      }
    };

    fetchQuestion();
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0) {
      submitHandler();
    } else {
      const timer = setTimeout(() => setTimeLeft(prevTime => prevTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  if (!question) return <div className="text-center text-gray-500 py-10">Loading...</div>;

  const initialInput = question.sampleInputs
    ? `${question.sampleInputs.length}\n${question.sampleInputs.map(inputObj => inputObj.input).join('\n')}`
    : '';

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto border border-gray-800">
        <h2 className="text-3xl font-bold text-blue-400">{question.title}</h2>
        <div className="text-gray-400 text-sm mt-2">
          Difficulty: <span className="text-yellow-500 font-medium">{question.difficulty}</span>
        </div>

        <div className="text-red-500 font-bold text-lg mt-4">
          Time Left: {formatTime(timeLeft)}
        </div>

        <p className="mt-6 text-gray-300 leading-relaxed">{question.description}</p>

        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="font-semibold text-blue-300 text-lg">Input Format:</h3>
          <p className="text-gray-400 mt-2">{question.inputFormat}</p>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="font-semibold text-blue-300 text-lg">Output Format:</h3>
          <p className="text-gray-400 mt-2">{question.outputFormat}</p>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="font-semibold text-blue-300 text-lg">Constraints:</h3>
          <p className="text-gray-400 mt-2">{question.constraints}</p>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow-lg mt-4"
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>

      <CodeEditor initialInput={initialInput} />
    </div>
  );
};

export default QuestionDetail;
