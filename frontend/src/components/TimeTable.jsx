import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaBookOpen } from 'react-icons/fa';
import { EmailContext } from '../contexts/EmailContext';

const Timetable = () => {
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

  if (!dashboardData) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        <FaBookOpen className="inline-block mr-2" />
        Weekly Timetable
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {dashboardData.timetable.slice(0, 3).map((daySchedule, index) => (
          <div key={index} className="p-4 bg-blue-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">{daySchedule.day}</h3>
            {daySchedule.classes.map((classInfo, idx) => (
              <div
                key={idx}
                className={`mb-2 p-4 rounded-lg shadow-md ${
                  classInfo.subject === "Math"
                    ? "bg-blue-500"
                    : classInfo.subject === "Science"
                    ? "bg-violet-500"
                    : "bg-orange-500"
                } text-white`}
              >
                <h4 className="text-lg font-bold">{classInfo.subject}</h4>
                <p className="text-sm">{classInfo.location}</p>
                <p className="text-sm">
                  {classInfo.time.start} - {classInfo.time.end}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
        {dashboardData.timetable.slice(3).map((daySchedule, index) => (
          <div key={index + 3} className="p-4 bg-blue-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">{daySchedule.day}</h3>
            {daySchedule.classes.map((classInfo, idx) => (
              <div
                key={idx}
                className={`mb-2 p-4 rounded-lg shadow-md ${
                  classInfo.subject === "Math"
                    ? "bg-blue-500"
                    : classInfo.subject === "Science"
                    ? "bg-violet-500"
                    : "bg-orange-500"
                } text-white`}
              >
                <h4 className="text-lg font-bold">{classInfo.subject}</h4>
                <p className="text-sm">{classInfo.location}</p>
                <p className="text-sm">
                  {classInfo.time.start} - {classInfo.time.end}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
