import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
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

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Day</th>
              <th className="p-4 text-left">Class Details</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.timetable.map((daySchedule, index) => (
              daySchedule.classes.length > 0 && ( // Only render if there are classes
                <tr key={index} className="odd:bg-blue-50 even:bg-yellow-100">
                  <td className="p-4 font-semibold text-blue-700 border border-gray-300">{daySchedule.day}</td>
                  <td className="p-4 border border-gray-300">
                    {daySchedule.classes.map((classInfo, idx) => (
                      <div key={idx} className="mb-2 p-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-md">
                        <h5 className="text-lg font-bold">{classInfo.subject}</h5>
                        <p className="text-sm">{classInfo.location}</p>
                        <p className="text-sm">
                          {classInfo.time.start} - {classInfo.time.end}
                        </p>
                      </div>
                    ))}
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
