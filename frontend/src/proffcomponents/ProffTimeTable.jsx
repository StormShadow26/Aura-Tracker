import React, { useState } from 'react';
import axios from 'axios';

const ProffTimeTable = () => {
  const [branch, setBranch] = useState('CSE');
  const [semester, setSemester] = useState('1');
  const [schedule, setSchedule] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  });
  const [day, setDay] = useState('monday');
  const [subjects, setSubjects] = useState([{ subjectName: '', startTime: '', endTime: '', location: '' }]);

  const handleInputChange = (e, index, field) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = e.target.value;
    setSubjects(updatedSubjects);
  };

  const addSubjectField = () => {
    setSubjects([...subjects, { subjectName: '', startTime: '', endTime: '', location: '' }]);
  };

  const handleTimetableSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/api/v1/createOrUpdateTimetable`, {
        semester,
        branch,
        schedule
      });
      alert('Timetable submitted: ' + response.data.message);
    } catch (error) {
      console.error(error);
      alert('Error submitting timetable');
    }
  };

  const handleDayUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/v1/updateDaySchedule/${semester}/${branch}/${day}`, {
        subjects
      });


      alert('Day updated: ' + response.data.message);
    } catch (error) {
      console.error(error);
      alert('Error updating day');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Timetable Form</h2>
      <div className="mb-4">
        <label className="block text-lg mb-2">Branch:</label>
        <select
          className="w-full p-2 border rounded-lg"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        >
          <option value="CSE">Computer Science</option>
          <option value="ME">Mechanical Engineering</option>
          <option value="EE">Electrical Engineering</option>
          {/* Add more branches as needed */}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg mb-2">Semester:</label>
        <select
          className="w-full p-2 border rounded-lg"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
          {/* Add more semesters as needed */}
        </select>
      </div>

      <div className="mb-6 p-4 border rounded-lg bg-white shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Update Specific Day</h3>
        <label className="block text-lg mb-2">Day:</label>
        <select
          className="w-full p-2 border rounded-lg mb-4"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>

        {subjects.map((subject, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Subject Name"
              className="w-full p-2 mb-2 border rounded-lg"
              value={subject.subjectName}
              onChange={(e) => handleInputChange(e, index, 'subjectName')}
            />
            <input
              type="text"
              placeholder="Start Time"
              className="w-full p-2 mb-2 border rounded-lg"
              value={subject.startTime}
              onChange={(e) => handleInputChange(e, index, 'startTime')}
            />
            <input
              type="text"
              placeholder="End Time"
              className="w-full p-2 mb-2 border rounded-lg"
              value={subject.endTime}
              onChange={(e) => handleInputChange(e, index, 'endTime')}
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full p-2 mb-2 border rounded-lg"
              value={subject.location}
              onChange={(e) => handleInputChange(e, index, 'location')}
            />
          </div>
        ))}
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-lg mb-2"
          onClick={addSubjectField}
        >
          Add Subject
        </button>
        <button
          className="w-full bg-green-500 text-white p-2 rounded-lg"
          onClick={handleDayUpdate}
        >
          Update Day
        </button>
      </div>

      <div className="p-4 border rounded-lg bg-white shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Submit Entire Timetable</h3>
        <button
          className="w-full bg-purple-500 text-white p-2 rounded-lg"
          onClick={handleTimetableSubmit}
        >
          Submit Timetable
        </button>
      </div>
    </div>
  );
};

export default ProffTimeTable;
