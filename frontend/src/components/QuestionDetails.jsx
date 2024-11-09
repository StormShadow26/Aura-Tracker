import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EmailContext } from '../contexts/EmailContext';
import axios from 'axios';
import CodeEditor from './CodeEditor';
import { useOutput } from '../contexts/OutputContext';
import { CloudCog } from 'lucide-react';
import Swal from 'sweetalert2';
import './QuestionDetails.css';

const QuestionDetail = () => {
  const { id } = useParams();
  const {email} = useContext(EmailContext); 
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const { output } = useOutput();
  const [timeLeft, setTimeLeft] = useState(900);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Function to compare output arrays
  function areArraysSame(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  const submitHandler = async () => {
    let arr = output.split('\n').map(Number);
    arr.pop();

    if (areArraysSame(arr, question.output)) {
      setIsCorrect(true);

      try {
        await axios.put(`http://localhost:4000/api/v1/updatequestion/${id}`, {
          email: email, 
          timeTaken: timeLeft,
        });

        await axios.post(`http://localhost:4000/api/v1/updateProgress`, {
          email: email,
          field: 'problemSolving',
          value: { solved: 1 }
        });
       
        Swal.fire({
          icon: 'success',
          title: 'Correct!',
          text: 'You have solved the question correctly!',
        });

      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later.',
        });
      }

    } else {
      setIsCorrect(false);
      Swal.fire({
        icon: 'error',
        title: 'Incorrect!',
        text: 'The output does not match the expected result. Try again!',
      });
    }
    setShowModal(true);
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
        setTimeLeft(initialTime);
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later.',
        });
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

  if (!question) return <div className="loading-message22">Loading...</div>;

  const initialInput = question.sampleInputs
    ? `${question.sampleInputs.length}\n${question.sampleInputs.map(inputObj => inputObj.input).join('\n')}`
    : '';

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="question-detail-container22">
      <div className="question-panel22">
        <h2 className="question-title22">{question.title}</h2>
        <div className="question-difficulty22">
          Difficulty: <span className="difficulty-level22">{question.difficulty}</span>
        </div>
        <div className="timer22">Time Left: {formatTime(timeLeft)}</div>
        <p className="question-description22">{question.description}</p>
        <div className="input-format22">
          <h3>Input Format:</h3>
          <p>{question.inputFormat}</p>
        </div>
        <div className="output-format22">
          <h3>Output Format:</h3>
          <p>{question.outputFormat}</p>
        </div>
        <div className="constraints22">
          <h3>Constraints:</h3>
          <p>{question.constraints}</p>
        </div>
        <button className="submit-button22" onClick={submitHandler}>Submit</button>
      </div>

      <div className="code-editor-container22">
        <CodeEditor initialInput={initialInput} />
      </div>

      {showModal && (
        <div className="modal-overlay22">
          <div className="modal22">
            <h2>{isCorrect ? 'Correct!' : 'Incorrect!'}</h2>
            <p>
              {isCorrect
                ? 'Congratulations, you solved the question correctly!'
                : 'The output does not match the expected result. Try again!'}
            </p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;
