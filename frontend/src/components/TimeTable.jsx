import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { email } = useContext(EmailContext);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/gettimetable/${email}`);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [email]);

  const handleMarkAttendance = (day, subject) => {
    console.log(`Marking attendance for ${subject} on ${day}`);
    // Additional logic for marking attendance can go here
  };

  if (!dashboardData) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Weekly Timetable</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200 shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="p-4 bg-blue-500 text-white text-left">Day</th>
              <th className="p-4 bg-blue-500 text-white text-left">Class Details</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.timetable.map((daySchedule, index) => (
              <tr key={index} className="odd:bg-gray-100 even:bg-gray-50">
                <td className="p-4 font-semibold text-gray-700 border border-gray-200">{daySchedule.day}</td>
                <td className="p-4 border border-gray-200">
                  {daySchedule.classes.map((classInfo, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between p-2 mb-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-white rounded-lg shadow-md"
                    >
                      <div>
                        <h5 className="text-sm font-bold">{classInfo.subject}</h5>
                        <p className="text-xs">{classInfo.location}</p>
                      </div>
                      <p className="text-xs font-medium">
                        {classInfo.time.start} - {classInfo.time.end}
                      </p>
                      <div className="text-right">
                        {classInfo.status === 'ongoing' ? (
                          <button
                            onClick={() => handleMarkAttendance(daySchedule.day, classInfo.subject)}
                            className="px-2 py-1 bg-green-500 hover:bg-green-700 text-white text-xs rounded"
                          >
                            Mark Attendance
                          </button>
                        ) : classInfo.status === 'missed' ? (
                          <span className="text-red-500 text-xs">Missed</span>
                        ) : (
                          <span className="text-blue-300 text-xs">Upcoming</span>
                        )}
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
