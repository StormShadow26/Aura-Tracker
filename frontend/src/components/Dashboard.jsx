import React, { useEffect, useState, useContext } from "react";
import { EmailContext } from "../contexts/EmailContext";
import HorizontalNavbar from "./HorizontalNavbar";
import VerticalNavbar from "./VerticalNavbar";
import axios from "axios";
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
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  


  const [data, setData] = useState({
    classes: { attended: 0, total: 0 },
    assignments: { done: 0, total: 0 },
    projects: { completed: 0, total: 0 },
    timetable: [],
    auraPoints: 0,
    department: "CSE",
    yearOfStudy: 2,
  });
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { email } = useContext(EmailContext);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!email) {
        console.error("Email is not available. User may not be logged in.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/dashboard/${email}`
        );
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          setData({
            classes: result.classes,
            assignments: result.assignments,
            projects: result.projects,
            timetable: result.timetable,
            auraPoints: result.auraPoints,
            department: result.department,
            yearOfStudy: result.yearOfStudy,
          });
        } else {
          console.error("Error fetching dashboard data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [email, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const COLORS = ["#ff7f50", "#6a5acd"];
  const fetchAssignments = async () => {
    const { department, yearOfStudy } = data; // Extract department and yearOfStudy from data
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/assignment/${department}${yearOfStudy}@gmail.com`
      );
      const sortedAssignments = response.data.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
      console.log(sortedAssignments[0], "sortedAssignments");
      setAssignments(sortedAssignments);
      // console.log(assignments,"assgin hun")
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const callFetchAssignments = async () => {
      await fetchAssignments();
    };

    callFetchAssignments();
  }, []); // Add dependencies as needed

  // fetchAssignments();

  // Badge logic based on auraPoints
  const getBadge = (auraPoints) => {
    if (auraPoints > 500) {
      return "🌟 God Level";
    } else if (auraPoints > 400) {
      return "🔥 Crazy";
    } else if (auraPoints > 250) {
      return "👏 Wow";
    } else if (auraPoints > 150) {
      return "🌟 Standard";
    } else if (auraPoints > 100) {
      return "👍 Ok Ok";
    } else if (auraPoints > 50) {
      return "🆕 Freshie";
    } else {
      return "😅 Newbie";
    }
  };

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
            <p id="badge-display" className="badge">
              {getBadge(data.auraPoints)}
            </p>
          </div>

          <div id="charts-container9">
            <div className="chart-section9">
              <h2>Attendance</h2>
              <ResponsiveContainer width="95%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Attended", value: data.classes.attended },
                      {
                        name: "Remaining",
                        value: data.classes.total - data.classes.attended,
                      },
                    ]}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
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
                      { name: "Done", value: data.assignments.done },
                      {
                        name: "Remaining",
                        value: data.assignments.total - data.assignments.done,
                      },
                    ]}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
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
                  data={[
                    {
                      name: "Projects",
                      Completed: data.projects.completed,
                      Remaining: data.projects.total - data.projects.completed,
                    },
                  ]}
                >
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
              {Array.isArray(data.timetable) && data.timetable.length > 0 ? (
                data.timetable.map((day, index) => (
                  <div className="timetable-day9" key={index}>
                    <h3>{day.day}</h3>
                    {Array.isArray(day.classes) && day.classes.length > 0 ? (
                      day.classes.map((classItem, i) => (
                        <div className="class-item9" key={i}>
                          <p>
                            <strong>Subject:</strong> {classItem.subject}
                          </p>
                          <p>
                            <strong>Time:</strong> {classItem.time.start} -{" "}
                            {classItem.time.end}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No classes available for {day.day}</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No timetable available.</p>
              )}
            </div>
          </div>
          <div
  id="assignments-section9"
  className="p-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl shadow-2xl"
>
  <h2 className="text-4xl font-extrabold text-white mb-6 text-center">
    Assignments Added by Professor
  </h2>
  {assignments.length > 0 ? (
    <div className="space-y-6">
      {assignments
        .filter((assignment) => new Date(assignment.deadline) >= new Date())
        .map((assignment, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-bold text-indigo-700 mb-3">
              {assignment.subject} - Chapter: {assignment.chapter}
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Deadline:</strong>{" "}
              <span className="text-blue-500">
                {new Date(assignment.deadline).toLocaleDateString()}
              </span>
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Submitted:</strong>{" "}
              {assignment.submitted ? (
                <span className="text-green-500 font-semibold">Yes</span>
              ) : (
                <span className="text-red-500 font-semibold">No</span>
              )}
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Professor:</strong> {assignment.professorName}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Description:</strong> {assignment.description}
            </p>
            
          </div>
        ))}
    </div>
  ) : (
    <p className="text-white text-xl text-center">No assignments available.</p>
  )}
</div>


        </div>
      </div>
    </div>
  );
};

export default Dashboard;
