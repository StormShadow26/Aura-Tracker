import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { EmailContext } from '../contexts/EmailContext';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2'; 
import './PomodoroPage.css';

const PomodoroPage = () => {
  const [mode, setMode] = useState('Pomodoro');
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const { email } = useContext(EmailContext); 
  const navigate = useNavigate();

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'Pomodoro' ? pomodoroTime * 60 : newMode === 'Short Break' ? shortBreakTime * 60 : longBreakTime * 60);
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
      return () => clearInterval(timer);
    } else if (isRunning && timeLeft === 0) {
      handleTimerComplete();
    }
  }, [isRunning, timeLeft]);

  const handleTimerComplete = async () => {
    setIsRunning(false);
    try {
      await axios.post(`http://localhost:4000/api/v1/updateProgress`, {
        email: email,
        field: 'sessions',
        value: { count: 1 },
      });
      Swal.fire({
        icon: 'success',
        title: 'Session Complete!',
        text: 'Your Pomodoro session is complete!',
      });
      if (mode === 'Pomodoro' && autoStartBreaks) {
        handleModeChange('Short Break');
        setIsRunning(true); 
      } else if (mode !== 'Pomodoro' && autoStartPomodoros) {
        handleModeChange('Pomodoro');
        setIsRunning(true); 
      }
    } catch (error) {
      console.error('Error updating sessions:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const completeTask = (index) => {
    setTasks(tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task));
  };

  const [settingsModal, setSettingsModal] = useState(false);

  const handleCloseSettings = () => {
    setSettingsModal(false);
  };

  const handleSaveSettings = async () => {
    handleCloseSettings();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div id="pomodoro-container25">
      <div id="pomodoro-page25" className="pomodoro-page25">
        <button id="settings-btn25" onClick={() => setSettingsModal(true)}>
          Settings
        </button>

        <h1 id="header25">Aura Tracker Pomodoro</h1>

        <div id="mode-buttons25">
          {['Pomodoro', 'Short Break', 'Long Break'].map((item) => (
            <button
              key={item}
              id={`mode-btn25-${item}`}
              className={`mode-button25 ${mode === item ? 'active-mode25' : ''}`}
              onClick={() => handleModeChange(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div id="timer-display25">{formatTime(timeLeft)}</div>

        <button id="start-pause-btn25" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'PAUSE' : 'START'}
        </button>

        <div id="task-container25">
          <input
            id="task-input25"
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button id="add-task-btn25" onClick={addTask}>
            Add Task
          </button>
          
          <ul id="task-list25">
            {tasks.map((task, index) => (
              <li
                key={index}
                id={`task25-${index}`}
                className={`task25 ${task.completed ? 'completed-task25' : ''}`}
              >
                <span className={`task-text25 ${task.completed ? 'completed-text25' : ''}`}>{task.text}</span>
                <button
                  className={`task-action-btn25 ${task.completed ? 'undo-btn25' : 'complete-btn25'}`}
                  onClick={() => completeTask(index)}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {settingsModal && (
          <div id="settings-modal25" className="settings-modal25">
            <div id="settings-container25">
              <h2 id="settings-title25">Settings</h2>
              <div className="setting-field25">
                <label>Pomodoro Time (minutes):</label>
                <input type="number" value={pomodoroTime} onChange={(e) => setPomodoroTime(e.target.value)} />
              </div>
              <div className="setting-field25">
                <label>Short Break Time (minutes):</label>
                <input type="number" value={shortBreakTime} onChange={(e) => setShortBreakTime(e.target.value)} />
              </div>
              <div className="setting-field25">
                <label>Long Break Time (minutes):</label>
                <input type="number" value={longBreakTime} onChange={(e) => setLongBreakTime(e.target.value)} />
              </div>
              <div className="setting-field25">
                <input type="checkbox" checked={autoStartBreaks} onChange={() => setAutoStartBreaks(!autoStartBreaks)} />
                <label>Auto Start Breaks</label>
              </div>
              <div className="setting-field25">
                <input type="checkbox" checked={autoStartPomodoros} onChange={() => setAutoStartPomodoros(!autoStartPomodoros)} />
                <label>Auto Start Pomodoros</label>
              </div>
              <button id="save-settings-btn25" onClick={handleSaveSettings}>Save Settings</button>
              <button id="close-settings-btn25" onClick={handleCloseSettings}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PomodoroPage;
