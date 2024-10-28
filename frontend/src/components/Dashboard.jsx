// src/components/Dashboard.js
import React, { useEffect, useState, useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import './Dashboard.css'; // New CSS file

const Dashboard = () => {
  const [data, setData] = useState({
    classes: { attended: 0, total: 0 },
    assignments: { done: 0, total: 0 },
    projects: { completed: 0, total: 0 },
    timetable: [],
  });
  const { emails } = useContext(EmailContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/dashboard/${emails}`);
        const result = await response.json();
        if (response.ok) {
          setData({
            classes: result.classes,
            assignments: result.assignments,
            projects: result.projects,
            timetable: result.timetable,
          });
        } else {
          console.error('Error fetching dashboard data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    if (emails) fetchData();
  }, [emails]);

  const COLORS = ['#4caf50', '#d9534f']; // Softer colors for pie chart

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Classes Chart */}
      <div className='flex'>
      <div className="dashboard-chart">
        <h2>Classes Attendance</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={[
                { name: 'Attended', value: data.classes.attended },
                { name: 'Total', value: data.classes.total - data.classes.attended }
              ]}
              dataKey="value"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
            >
              {COLORS.map((color, index) => <Cell key={`cell-${index}`} fill={color} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Assignments Chart */}
      <div className="dashboard-chart">
        <h2>Assignments Completion</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={[
                { name: 'Done', value: data.assignments.done },
                { name: 'Remaining', value: data.assignments.total - data.assignments.done }
              ]}
              dataKey="value"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
            >
              {COLORS.map((color, index) => <Cell key={`cell-${index}`} fill={color} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      </div>

      {/* Projects Chart */}
      <div className="dashboard-chart">
        <h2>Projects Progress</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={[
              { name: 'Projects', Completed: data.projects.completed, Remaining: data.projects.total - data.projects.completed }
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Completed" fill="#82ca9d" />
            <Bar dataKey="Remaining" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Timetable - Day Wise Display */}
      <h2 className="timetable-title">Weekly Timetable</h2>
      <div className="timetable-container">
        {data.timetable.map((day, index) => (
          <div className="timetable-day" key={index}>
            <h3 className="day-title">{day.day}</h3>
            {day.classes.map((classItem, i) => (
              <div className="class-item" key={i}>
                <p><strong>Subject:</strong> {classItem.subject}</p>
                <p><strong>Time:</strong> {classItem.time.start} - {classItem.time.end}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
