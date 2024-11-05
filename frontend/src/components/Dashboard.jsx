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
    auraPoints: 0,
  });
  const { email } = useContext(EmailContext);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!email) {
        console.error('Email is not available. User may not be logged in.');
        return;
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
            auraPoints: result.auraPoints,
          });
        } else {
          console.error('Error fetching dashboard data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [email, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const COLORS = ['#ff7f50', '#6a5acd'];

  return (
    <div id="dashboard-main9">
      <VerticalNavbar />

      <div id="dashboard-content9">
        <HorizontalNavbar handleRefresh={handleRefresh} />

        <div id="dashboard-container9">
          <h1 id="dashboard-title">Dashboard</h1>

          <div id="aura-points9">
            <h2 id="aura-points-title9">Aura Points</h2>
            <p>{data.auraPoints}</p>
          </div>

          <div id="charts-container9">
            <div className="chart-section9">
              <h2>Attendance</h2>
              <ResponsiveContainer width="95%" height={300}>
                <PieChart>
                  <Pie
                    data={[ 
                      { name: 'Attended', value: data.classes.attended },
                      { name: 'Remaining', value: data.classes.total - data.classes.attended },
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

            <div className="chart-section9">
              <h2>Assignments</h2>
              <ResponsiveContainer width="95%" height={300}>
                <PieChart>
                  <Pie
                    data={[ 
                      { name: 'Done', value: data.assignments.done },
                      { name: 'Remaining', value: data.assignments.total - data.assignments.done },
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

            <div className="chart-section9">
              <h2>Projects Progress</h2>
              <ResponsiveContainer width="95%" height={300}>
                <BarChart
                  data={[{ name: 'Projects', Completed: data.projects.completed, Remaining: data.projects.total - data.projects.completed }]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Completed" fill="#00c853" />
                  <Bar dataKey="Remaining" fill="#d32f2f" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div id="timetable-section9">
            <h2 id="timetable-title9">Weekly Timetable</h2>
            <div id="timetable-container9">
              {data.timetable.map((day, index) => (
                <div className="timetable-day9" key={index}>
                  <h3>{day.day}</h3>
                  {day.classes.map((classItem, i) => (
                    <div className="class-item9" key={i}>
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
    </div>
  );
};

export default Dashboard;
