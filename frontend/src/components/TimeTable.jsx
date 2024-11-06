import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaBookOpen } from 'react-icons/fa6';
import { EmailContext } from '../contexts/EmailContext';
import './TimeTable.css';

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

  if (!dashboardData) return <p className="loading13">Loading...</p>;

  return (
    <div className="container13">
      <h2 className="title13">
        <FaBookOpen className="icon13" />
        Weekly Timetable
      </h2>

      <div className="timetable-grid13">
        {dashboardData.timetable.map((daySchedule, index) => (
          <div key={index} className="day-tile13">
            <h3 className="day-title13">{daySchedule.day}</h3>
            {daySchedule.classes.map((classInfo, idx) => (
              <div
                key={idx}
                className={`class-info13 ${classInfo.subject.toLowerCase()}13`}
              >
                <h4 className="subject13">{classInfo.subject}</h4>
                <p className="location13">{classInfo.location}</p>
                <p className="time13">
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
