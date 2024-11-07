import React, { useState, useEffect } from 'react';

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
    }
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white font-sans relative">
      {/* Settings button at top-right corner */}
      <button
        className="absolute top-4 right-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-200"
        onClick={() => setShowSettings(true)}
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
    </div>
  );
};

export default PomodoroPage;
