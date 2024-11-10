import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { EmailContext } from '../contexts/EmailContext'; 
import { useParams } from 'react-router-dom';
import { Chart } from 'react-chartjs-2'; 
import {
  FaGraduationCap,
  FaBuilding,
  FaPhone,
  FaChalkboardTeacher,
  FaChartBar,
  FaProjectDiagram,
  FaQuestionCircle,
  FaRunning,
  FaUserCheck,
  FaCalendarAlt,
  FaClock,
  FaTrophy,
} from 'react-icons/fa';
import { Bar } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import OpenAI from "openai";
import './Analytics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const { email } = useContext(EmailContext); 
  const [userData, setUserData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [analysisSummary, setAnalysisSummary] = useState("");
  
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  const apiKey = 'AIzaSyBQdsSOFFJrI9Ote5Q293y1npisCLWdC3o';
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  useEffect(() => {
    if (!email) return;

    const fetchAnalysis = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/getUserData/${email}`); 
        setUserData(response.data); 

        const assignmentCompletionRate = response.data.assignments.total === 0
          ? 0
          : (response.data.assignments.done / response.data.assignments.total) * 100;
        const classAttendanceRate = response.data.classes.total === 0
          ? 0
          : (response.data.classes.attended / response.data.classes.total) * 100;
        const weeklyClassAttendanceRate = response.data.weeksclasses.total === 0
          ? 0
          : (response.data.weeksclasses.attended / response.data.weeksclasses.total) * 100;
        const projectCompletionRate = response.data.projects.total === 0
          ? 0
          : (response.data.projects.completed / response.data.projects.total) * 100;
        const quizAccuracy = response.data.quiz.questionsAttempted === 0
          ? 0
          : (response.data.quiz.questionsCorrect / response.data.quiz.questionsAttempted) * 100;
        const problemSolvingSuccessRate = response.data.problemSolving.solved === 0 
          ? 0
          : (response.data.problemSolving.solved / response.data.problemSolving.total) * 100;
        const contestParticipationRate = response.data.contests.given === 0
          ? 0
          : (response.data.contests.given / response.data.contests.total) * 100;
        const sessionAttendanceRate = response.data.sessions.count === 0
          ? 0
          : (response.data.sessions.count / response.data.sessions.total) * 100;

        setChartData([
          { name: 'Assignment Completion', value: assignmentCompletionRate },
          { name: 'Class Attendance', value: classAttendanceRate },
          { name: 'Weekly Class Attendance', value: weeklyClassAttendanceRate },
          { name: 'Project Completion', value: projectCompletionRate },
          { name: 'Quiz Accuracy', value: quizAccuracy },
          { name: 'Problem Solving Success', value: problemSolvingSuccessRate },
          { name: 'Contest Participation', value: contestParticipationRate },
          { name: 'Session Attendance', value: sessionAttendanceRate }
        ]);

        response = await axios.get(`http://localhost:4000/api/v1/getUserData/${email}`);
        const data = response.data;
        setUserData(data);

        const calculateRate = (completed, total) => total === 0 ? 0 : (completed / total) * 100;

        const chartMetrics = [
          { name: 'Assignment Completion', value: calculateRate(data.assignments.done, data.assignments.total) },
          { name: 'Class Attendance', value: calculateRate(data.classes.attended, data.classes.total) },
          { name: 'Weekly Class Attendance', value: calculateRate(data.weeksclasses.attended, data.weeksclasses.total) },
          { name: 'Project Completion', value: calculateRate(data.projects.completed, data.projects.total) },
          { name: 'Quiz Accuracy', value: calculateRate(data.quiz.questionsCorrect, data.quiz.questionsAttempted) },
          { name: 'Problem Solving Success', value: data.problemSolving.solved || 0 },
          { name: 'Contests Participated', value: data.contests.given || 0 },
          { name: 'Sessions Count', value: data.sessions.count || 0 }
        ];

        setChartData(chartMetrics);
        
        await callGeminiForAnalysis(data);

      } catch (error) {
        console.error('Error fetching user analysis:', error.response?.data || error.message);
      }
    };

    fetchAnalysis();
  }, [email]);

  const callGeminiForAnalysis = async (userData) => {
    const prompt = `Hey Gemini, this is the summary of the student's activities: ${JSON.stringify(userData)}. Provide a detailed summary and improvement recommendations.`;
    
    try {
      const result = await model.generateContent({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      });

      const recommendationText = result.response.candidates[0].content.parts[0].text;
      setAnalysisSummary(recommendationText);
    } catch (error) {
      console.error('Error with Gemini API:', error);
      setAnalysisSummary('Could not fetch analysis from Gemini.');
    }
  };

  if (!userData || !chartData) return <div>Loading...</div>;

  const chartConfig = {
    labels: chartData.map(item => item.name),
    datasets: [
      {
        label: 'Student Performance Metrics',
        data: chartData.map(item => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192,  0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(0, 153, 0, 0.6)',
          'rgba(255, 0, 0, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 153, 0, 1)',
          'rgba(255, 0, 0, 1)',
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div id="analytics-container-29">
      <h1 id="analytics-header-29">Student Analytics</h1>
      <div id="stat-grid-29">
        {chartData.map((stat, index) => (
          <div key={index} className="stat-card-29">
            <div id="stat-icon-29"><FaChartBar /></div>
            <div>
              <div id="stat-label-29">{stat.name}</div>
              <div id="stat-description-29">{stat.value}%</div>
            </div>
          </div>
        ))}
      </div>
      <div id="chart-container-29">
        <Bar data={chartConfig} />
      </div>
      <div id="gemini-summary-container-29">
        <h2 id="gemini-summary-header-29">AI Generated Insights</h2>
        <p id="gemini-summary-29">{analysisSummary}</p>
      </div>
    </div>
  );
};

export default Analytics;
