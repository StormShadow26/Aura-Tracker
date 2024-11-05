import React, { useState, useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import './BuildProfile.css';

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
    ],
  });

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
    <div id="back">
    <div id="build-profile-container10">
      <h1 id="page-title10">Build Profile</h1>
      <form id="profile-form10" onSubmit={handleSubmit}>
        <label className="label10" htmlFor="name10">Name:</label>
        <input className="input10" id="name10" name="name" value={formData.name} onChange={handleChange} required />
        
        <label className="label10" htmlFor="yearOfStudy10">Year:</label>
        <input className="input10" id="yearOfStudy10" name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} required />

        <label className="label10" htmlFor="department10">Department:</label>
        <input className="input10" id="department10" name="department" value={formData.department} onChange={handleChange} required />

        <label className="label10" htmlFor="college10">College:</label>
        <input className="input10" id="college10" name="college" value={formData.college} onChange={handleChange} required />

        <label className="label10" htmlFor="phone10">Phone:</label>
        <input className="input10" id="phone10" name="phone" value={formData.phone} onChange={handleChange} required />

        <div id="timetable-container10">
          <h2>Timetable</h2>
          {formData.timetable.map((day, dayIndex) => (
            <div key={day.day}>
              <div className="day-toggle10"  onClick={() => toggleDayOpen(dayIndex)}>{day.day}</div>
              {day.open && day.classes.map((classInfo, classIndex) => (
                <div className="class-info10" key={classIndex}>
                  <label className="label10" id="baigan" htmlFor={`subject${dayIndex}-${classIndex}`}>Subject:</label>
                  <input className="input10" id={`subject${dayIndex}-${classIndex}`} value={classInfo.subject}
                         onChange={(e) => handleTimetableChange(dayIndex, classIndex, 'subject', e.target.value)} required />

                  <label className="label10" id="baigan"htmlFor={`time-start${dayIndex}-${classIndex}`}>Start Time:</label>
                  <input className="input10" id={`time-start${dayIndex}-${classIndex}`} type="time" value={classInfo.time.start}
                         onChange={(e) => handleTimetableChange(dayIndex, classIndex, 'time.start', e.target.value)} required />

                  <label className="label10" id="baigan"htmlFor={`time-end${dayIndex}-${classIndex}`}>End Time:</label>
                  <input className="input10" id={`time-end${dayIndex}-${classIndex}`} type="time" value={classInfo.time.end}
                         onChange={(e) => handleTimetableChange(dayIndex, classIndex, 'time.end', e.target.value)} required />

                  <label className="label10" id="baigan"htmlFor={`location${dayIndex}-${classIndex}`}>Location:</label>
                  <input className="input10" id={`location${dayIndex}-${classIndex}`} value={classInfo.location}
                         onChange={(e) => handleTimetableChange(dayIndex, classIndex, 'location', e.target.value)} required />

                  <button type="button" className="remove-class-button10" onClick={() => removeClass(dayIndex, classIndex)}>Remove Class</button>
                </div>
              ))}
              <button type="button" className="add-class-button10" onClick={() => addClass(dayIndex)}>Add Class</button>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button10">Submit</button>
      </form>
    </div></div>
  );
};

export default BuildProfile;
