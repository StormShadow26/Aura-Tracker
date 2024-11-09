import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TimeTable.css';

const Timetable = ({ semester, branch }) => {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch timetable data based on semester and branch
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/getTt/2/CSE`);
        setTimetable(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching timetable:", error);
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [semester, branch]);

  if (loading) return <p>Loading...</p>;
  if (!timetable) return <p>Timetable not found.</p>;

  return (
    <div className="timetable-container">
      <h2>Timetable for {semester} - {branch}</h2>

      <div className="timetable-grid">
        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
          const daySchedule = timetable[day];

          return (
            <div key={day} className="day-tile">
              <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
              {daySchedule.length > 0 ? (
                daySchedule.map((subject, index) => (
                  <div key={index} className="class-info">
                    <h4>{subject.subjectName}</h4>
                    <p>{subject.startTime} - {subject.endTime}</p>
                    <p>{subject.location}</p>
                  </div>
                ))
              ) : (
                <p>No classes scheduled.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timetable;
