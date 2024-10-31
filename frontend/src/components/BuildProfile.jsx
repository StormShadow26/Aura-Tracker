import React, { useState, useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';

const BuildProfile = () => {
  const { email } = useContext(EmailContext);

  const [formData, setFormData] = useState({
    name: '',
    yearOfStudy: '',
    department: '',
    college: '',
    phone: '',
    timetable: [
      { day: 'Monday', classes: [{ subject: '', time: { start: '', end: '' }, location: '' }], open: false },
      { day: 'Tuesday', classes: [{ subject: '', time: { start: '', end: '' }, location: '' }], open: false },
      { day: 'Wednesday', classes: [{ subject: '', time: { start: '', end: '' }, location: '' }], open: false },
      { day: 'Thursday', classes: [{ subject: '', time: { start: '', end: '' }, location: '' }], open: false },
      { day: 'Friday', classes: [{ subject: '', time: { start: '', end: '' }, location: '' }], open: false },
      { day: 'Saturday', classes: [{ subject: '', time: { start: '', end: '' }, location: '' }], open: false },
      { day: 'Sunday', classes: [{ subject: '', time: { start: '', end: '' }, location: '' }], open: false },
    ],
  });

  // Toggle visibility of each day's classes
  const toggleDayOpen = (dayIndex) => {
    setFormData((prevData) => {
      const updatedTimetable = prevData.timetable.map((day, index) =>
        index === dayIndex ? { ...day, open: !day.open } : day
      );
      return { ...prevData, timetable: updatedTimetable };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTimetableChange = (dayIndex, classIndex, field, value) => {
    const updatedTimetable = [...formData.timetable];
    if (field.includes('.')) {
      const [parentField, childField] = field.split('.');
      updatedTimetable[dayIndex].classes[classIndex][parentField][childField] = value;
    } else {
      updatedTimetable[dayIndex].classes[classIndex][field] = value;
    }
    setFormData((prevData) => ({
      ...prevData,
      timetable: updatedTimetable,
    }));
  };

  const addClass = (dayIndex) => {
    const updatedTimetable = [...formData.timetable];
    updatedTimetable[dayIndex].classes.push({ subject: '', time: { start: '', end: '' }, location: '' });
    setFormData((prevData) => ({
      ...prevData,
      timetable: updatedTimetable,
    }));
  };

  const removeClass = (dayIndex, classIndex) => {
    const updatedTimetable = [...formData.timetable];
    updatedTimetable[dayIndex].classes.splice(classIndex, 1);
    setFormData((prevData) => ({
      ...prevData,
      timetable: updatedTimetable,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/v1/profile/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) alert('Profile updated successfully!');
      else console.error('Error updating profile:', result.message);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-700">Build Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Basic Details */}
        <div>
          <label className="block text-gray-600">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600">Year of Study:</label>
          <select
            name="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="5">5th Year</option>
          </select>
        </div>

        {/* Timetable for the week */}
        <h2 className="text-xl font-semibold mt-8 text-gray-600">Weekly Timetable</h2>
        {formData.timetable.map((day, dayIndex) => (
          <div key={dayIndex} className="mt-4 bg-gray-50 p-4 rounded-md">
            <div
              onClick={() => toggleDayOpen(dayIndex)}
              className="cursor-pointer flex justify-between items-center"
            >
              <h3 className="text-lg font-semibold text-gray-700">{day.day}</h3>
              <span className="text-blue-500">{day.open ? '▼' : '►'}</span>
            </div>
            {day.open && (
              <div className="mt-4">
                {day.classes.map((classInfo, classIndex) => (
                  <div key={classIndex} className="mt-4 space-y-2">
                    <label className="block text-gray-600">Subject:</label>
                    <input
                      type="text"
                      value={classInfo.subject}
                      onChange={(e) => handleTimetableChange(dayIndex, classIndex, 'subject', e.target.value)}
                      className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />

                    <label className="block text-gray-600">Start Time:</label>
                    <input
                      type="time"
                      value={classInfo.time.start}
                      onChange={(e) => handleTimetableChange(dayIndex, classIndex, 'time.start', e.target.value)}
                      className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />

                    <label className="block text-gray-600">End Time:</label>
                    <input
                      type="time"
                      value={classInfo.time.end}
                      onChange={(e) => handleTimetableChange(dayIndex, classIndex, 'time.end', e.target.value)}
                      className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />

                    <label className="block text-gray-600">Location:</label>
                    <input
                      type="text"
                      value={classInfo.location}
                      onChange={(e) => handleTimetableChange(dayIndex, classIndex, 'location', e.target.value)}
                      className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => removeClass(dayIndex, classIndex)}
                      className="mt-2 text-red-500 hover:underline"
                    >
                      Remove Class
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addClass(dayIndex)}
                  className="mt-4 text-blue-500 hover:underline"
                >
                  Add Class
                </button>
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default BuildProfile;
