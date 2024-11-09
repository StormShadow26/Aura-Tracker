import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { EmailContext } from '../contexts/EmailContext';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2'; 

const PomodoroPage = () => {
  const [mode, setMode] = useState('Pomodoro');
  const [timeLeft, setTimeLeft] = useState(1500); // Default for Pomodoro (25 mins)
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Settings state
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);

  // Task list state
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const { email } = useContext(EmailContext); 
  const navigate = useNavigate();

  // Update time based on mode
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'Pomodoro' ? pomodoroTime * 60 : newMode === 'Short Break' ? shortBreakTime * 60 : longBreakTime * 60);
  };

  // Countdown logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
      return () => clearInterval(timer);
    } else if (isRunning && timeLeft === 0) {
      // Timer completed, update sessions
      handleTimerComplete();
    }
  }, [isRunning, timeLeft]);

  // Handle timer completion and update sessions
  const handleTimerComplete = async () => {
    setIsRunning(false);

    try {
      await axios.post(`http://localhost:4000/api/v1/updateProgress`, {
        email: email,
        field: 'sessions',
        value: {
          count: 1,
        },
      });

      // Display success message
      Swal.fire({
        icon: 'success',
        title: 'Session Complete!',
        text: 'Your Pomodoro session is complete!',
      });

      // Optionally: Auto-start next session based on settings
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

  // Add new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Mark task as completed
  const completeTask = (index) => {
    setTasks(tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task));
  };

  // Settings Modal
  const [settingsModal, setSettingsModal] = useState(false);

  const handleCloseSettings = () => {
    setSettingsModal(false);
  };

  const handleSaveSettings = async () => {
    // ... update settings in your database ...
    handleCloseSettings();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0') }`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white font-sans relative">
      {/* Settings button at top-right corner */}
      <button
        className="absolute top-4 right-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-200"
        onClick={() => setSettingsModal(true)}
      >
        Settings
      </button>

      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 tracking-widest text-center text-indigo-200 glow-text">Aura Tracker Pomodoro</h1>

      {/* Mode buttons */}
      <div className="flex space-x-4 mb-6">
        {['Pomodoro', 'Short Break', 'Long Break'].map((item) => (
          <button
            key={item}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              mode === item ? 'bg-indigo-700 text-indigo-100 shadow-lg scale-105' : 'bg-gray-800 text-gray-400'
            }`}
            onClick={() => handleModeChange(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Timer display */}
      <div className="text-9xl font-bold mb-8 tracking-wider glow-text">{formatTime(timeLeft)}</div>

      {/* Start/Pause button */}
      <button
        className="bg-white text-indigo-700 font-bold py-3 px-10 rounded-full shadow-xl text-xl mb-8 transition-all duration-200 hover:scale-105 active:scale-95"
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? 'PAUSE' : 'START'}
      </button>

      {/* Task Input and List */}
      <div className="w-1/2 max-w-lg mb-8">
        <input
          type="text"
          className="w-full px-4 py-2 rounded text-black"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="mt-2 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-full font-bold"
          onClick={addTask}
        >
          Add Task
        </button>
        
        <ul className="mt-4 space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-4 rounded-lg ${task.completed ? 'bg-green-600' : 'bg-gray-800'} transition-all duration-200`}
            >
              <span className={`${task.completed ? 'line-through text-gray-400' : ''}`}>{task.text}</span>
              <button
                className={`px-4 py-1 rounded ${task.completed ? 'bg-red-500' : 'bg-green-500'}`}
                onClick={() => completeTask(index)}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Settings Modal */}
      {settingsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <div className="mb-4">
              <label className="block mb-2">Pomodoro Time (minutes):</label>
              <input
                type="number"
                value={pomodoroTime}
                onChange={(e) => setPomodoroTime(e.target.value)}
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Short Break Time (minutes):</label>
              <input
                type="number"
                value={shortBreakTime}
                onChange={(e) => setShortBreakTime(e.target.value)}
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Long Break Time (minutes):</label>
              <input
                type="number"
                value={longBreakTime}
                onChange={(e) => setLongBreakTime(e.target.value)}
                className="border rounded p -2 w-full"
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={autoStartBreaks}
                onChange={() => setAutoStartBreaks(!autoStartBreaks)}
                className="mr-2"
              />
              <label>Auto Start Breaks</label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={autoStartPomodoros}
                onChange={() => setAutoStartPomodoros(!autoStartPomodoros)}
                className="mr-2"
              />
              <label>Auto Start Pomodoros</label>
            </div>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded"
              onClick={handleSaveSettings}
            >
              Save Settings
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-2"
              onClick={handleCloseSettings}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PomodoroPage;