import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CodeEditor from './CodeEditor';
import { useOutput } from '../contexts/OutputContext';
import './ContestQuestionsDetails.css'

const QuestionDetail = () => {
  const { contestId, id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const { output } = useOutput();

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
        const response = await axios.get(`http://localhost:4000/api/v1/getcontests/${contestId}`);

        for (let i = 0; i < 5; i++) {
          if (response.data.contest.questions[i]._id === id) {
            setQuestion(response.data.contest.questions[i]);
          }
        }
      } catch (error) {
        console.error('Error fetching question details:', error);
      }
    };

    fetchQuestion();
  }, [id]);

  if (!question) return <div id="loading33" className="text-center text-gray-500 py-10">Loading...</div>;

  const initialInput = question.sampleInputs
    ? `${question.sampleInputs.length}\n${question.sampleInputs.map(inputObj => inputObj.input).join('\n')}`
    : '';

  return (
    <div id="container33">
      <div id="question-detail33">
        <h2 id="question-title33">{question.title}</h2>
        <div id="difficulty33">
          Difficulty: <span id="difficulty-level33">{question.difficulty}</span>
        </div>
        <p id="description33">{question.description}</p>

        <div id="input-format33">
          <h3 className="format-title33">Input Format:</h3>
          <p>{question.inputFormat}</p>
        </div>

        <div id="output-format33">
          <h3 className="format-title33">Output Format:</h3>
          <p>{question.outputFormat}</p>
        </div>

        <div id="constraints33">
          <h3 className="format-title33">Constraints:</h3>
          <p>{question.constraints}</p>
        </div>

        <button id="submit-button33" onClick={submitHandler}>
          Submit
        </button>
      </div>

      <div id="code-editor-container33">
        <CodeEditor initialInput={initialInput} />
      </div>
    </div>
  );
};

export default QuestionDetail;
