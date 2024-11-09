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

const Analytics = () => {
  const { email } = useContext(EmailContext); 
  const [userData, setUserData] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/getUserData/${email}`); 
        setUserData(response.data); 

        // Calculate chart data 
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
      } catch (error) {
        console.error('Error fetching user analysis:', error);
      }
    };

    fetchAnalysis();
  }, [email]);

  if (!userData || !chartData) return <div>Loading...</div>;

  // Prepare chart data for react-chartjs-2
  const chartConfig = {
    type: 'bar', 
    data: {
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
            'rgba(255, 0, 0, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 153, 0, 1)',
            'rgba(255, 0, 0, 1)'
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          // 'linear' is not a valid scale type in Chart.js!
          // Use 'category' or 'linear' depending on your data:
          type: 'linear',  // For numerical data
          // type: 'category', // For categorical data (like the labels in your chart) 
          beginAtZero: true,
          title: {
            display: true,
            text: 'Percentage (%)',
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: 'Student Performance Breakdown',
          font: {
            size: 24,
            weight: 'bold',
          },
          color: 'white',
        },
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 16,
              weight: 'bold',
            },
            color: 'white',
          },
        },
      },
    },
  };

  const renderStat = (icon, label, value, description) => (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 shadow-md flex items-center">
      {icon && <div className="text-4xl text-blue-500 mr-4">{icon}</div>}
      <div className="flex-1">
        <h3 className="text-xl text-white font-semibold">{label}</h3>
        <p className="text-gray-400">{description}</p>
        <p className="text-2xl text-white">{value.toFixed(2)}%</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-3xl text-white font-bold mb-6">Student Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderStat(<FaGraduationCap />, 'Assignments Completed', userData.assignments.done, 'Total assignments completed by the student.')}
        {renderStat(<FaChartBar />, 'Classes Attended', userData.classes.attended, 'Total classes attended by the student.')}
        {renderStat(<FaProjectDiagram />, 'Projects Completed', userData.projects.completed, 'Total projects completed by the student.')}
        {renderStat(<FaQuestionCircle />, 'Quizzes Attempted', userData.quiz.questionsAttempted, 'Total quizzes attempted by the student.')}
        {renderStat(<FaRunning />, 'Contests Participated', userData.contests.given, 'Total contests participated by the student.')}
        {renderStat(<FaClock />, 'Sessions Count', userData.sessions.count, 'Total study sessions recorded.')}
      </div>
      <div className="mt-8">
        <Chart {...chartConfig} />
      </div>
    </div>
  );
};

export default Analytics;