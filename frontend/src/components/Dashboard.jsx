// src/components/Dashboard.js
import React, { useEffect, useState, useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import HorizontalNavbar from './HorizontalNavbar';
import VerticalNavbar from './VerticalNavbar';
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
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState({
    classes: { attended: 0, total: 0 },
    assignments: { done: 0, total: 0 },
    projects: { completed: 0, total: 0 },
    timetable: [],
  });
  const { email } = useContext(EmailContext); // Access email from context

  useEffect(() => {
    const fetchData = async () => {
      if (!email) {
        console.error('Email is not available. User may not be logged in.');
        return; // Early return if email is not available
      }

      try {
        const response = await fetch(`http://localhost:4000/api/v1/dashboard/${email}`);
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

    fetchData(); // Fetch data when component mounts
  }, [email]); // Dependency on email

  const COLORS = ['#4caf50', '#d9534f'];

  return (
    <div className="flex">
      {/* Vertical Navbar */}
      <VerticalNavbar />

      <div className="flex flex-col flex-grow ml-48 px-8">
        {/* Horizontal Navbar */}
        <HorizontalNavbar />

        <div className="dashboard-container">
          <h1 className="dashboard-title text-3xl mb-6">Dashboard</h1>

          {/* Classes Chart */}
          <div className='flex justify-around'>
            <div className="dashboard-chart w-1/3">
              <h2>Attendance</h2>
              <ResponsiveContainer width="95%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Attended', value: data.classes.attended },
                      { name: 'Total', value: data.classes.total }
                    ]}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
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
            <div className="dashboard-chart w-1/3">
              <h2>Assignments</h2>
              <ResponsiveContainer width="95%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Done', value: data.assignments.done },
                      { name: 'Remaining', value: data.assignments.total - data.assignments.done }
                    ]}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
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
          <div className="dashboard-chart mt-6">
            <h2>Projects Progress</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[{ name: 'Projects', Completed: data.projects.completed, Remaining: data.projects.total - data.projects.completed }]}
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
          <h2 className="timetable-title mt-6">Weekly Timetable</h2>
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
      </div>
    </div>
  );
};

export default Dashboard;
