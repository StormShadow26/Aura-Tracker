import React, { useEffect, useState, useContext } from 'react';
import { EmailContext } from '../contexts/EmailContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StudyMaterials = () => {
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [completedChapters, setCompletedChapters] = useState({});
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const { email } = useContext(EmailContext);
  const navigate = useNavigate(); // Initialize useNavigate

  // Hard-coded branches and semesters
  const branches = ["CSE", "ECE", "EE", "MECH", "CHEM", "PIE"];
  const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

  // Load subjects based on selected branch and semester
  const loadSubjects = async () => {
    if (!selectedBranch || !selectedSemester) return;
    const response = await axios.get(`http://localhost:4000/api/v1/api/syllabus?branchName=${selectedBranch}&semesterNumber=${selectedSemester}`);
    setSubjects(response.data[0].semesters[0].subjects);
  };

  // Load chapters based on selected subject
  const loadChapters = async () => {
    if (!selectedBranch || !selectedSemester || !selectedSubject) return;
    const response = await axios.get(`http://localhost:4000/api/v1/api/syllabus?branchName=${selectedBranch}&semesterNumber=${selectedSemester}&subjectName=${selectedSubject}`);
    const subjectData = response.data[0].semesters[0].subjects.find(subject => subject.subjectName === selectedSubject);
    setChapters(subjectData ? subjectData.chapters : []);
  };

  // Mark chapter as complete
  const toggleChapterCompletion = async (chapterName) => {
    if (!completedChapters[chapterName]) {
      try {
        // Increment aura points on the backend
        await axios.post('http://localhost:4000/api/v1/increment-aura-points', {
          email: email,  // Replace this with the actual user ID
          incrementValue: 7,
        });

        // Update completedChapters in the state
        setCompletedChapters((prev) => ({
          ...prev,
          [chapterName]: true,
        }));

        // Show success alert
        Swal.fire('Thala for a Reason!', 'Your aura points have increased by 7.', 'success');
      } catch (error) {
        console.error('Error updating aura points:', error);
        alert('Failed to update aura points. Please try again.');
      }
    }
  };

  useEffect(() => {
    loadSubjects();
  }, [selectedBranch, selectedSemester]);

  useEffect(() => {
    loadChapters();
  }, [selectedSubject]);

  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Syllabus Viewer</h1>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <div className="flex flex-col">
          <label htmlFor="branch" className="text-lg font-semibold mb-2">Select Branch:</label>
          <select
            id="branch"
            className="p-2 rounded border border-gray-300"
            onChange={(e) => {
              setSelectedBranch(e.target.value);
              setSelectedSemester('');
              setSelectedSubject('');
              setSubjects([]);
              setChapters([]);
            }}
          >
            <option value="">--Select Branch--</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>{branch}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="semester" className="text-lg font-semibold mb-2">Select Semester:</label>
          <select
            id="semester"
            className="p-2 rounded border border-gray-300"
            onChange={(e) => {
              setSelectedSemester(e.target.value);
              setSelectedSubject('');
              setChapters([]);
            }}
            disabled={!selectedBranch}
          >
            <option value="">--Select Semester--</option>
            {semesters.map((semesterNumber) => (
              <option key={semesterNumber} value={semesterNumber}>Semester {semesterNumber}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="subject" className="text-lg font-semibold mb-2">Select Subject:</label>
          <select
            id="subject"
            className="p-2 rounded border border-gray-300"
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={!selectedSemester}
          >
            <option value="">--Select Subject--</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject.subjectName}>{subject.subjectName}</option>
            ))}
          </select>
        </div>
      </div>

      <div id="chapters" className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Chapters:</h2>
        <ul className="space-y-4">
          {chapters.map((chapter, index) => (
            <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <strong className="text-lg">{chapter.chapterName}</strong>
                  <div className="mt-2 text-gray-600">
                    <div>Pretest: <a href={chapter.resources.pretestLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{chapter.resources.pretestLink}</a></div>
                    <div>Study Material: <a href={chapter.resources.studyMaterialLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{chapter.resources.studyMaterialLink}</a></div>
                    <div>Assignment: <a href={chapter.resources.assignmentLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{chapter.resources.assignmentLink}</a></div>
                  </div>
                </div>
                <button
                  className={`ml-4 p-2 rounded text-white font-semibold ${completedChapters[chapter.chapterName] ? 'bg-green-500' : 'bg-gray-400 hover:bg-gray-500'}`}
                  onClick={() => toggleChapterCompletion(chapter.chapterName)}
                >
                  {completedChapters[chapter.chapterName] ? 'Completed' : 'Complete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Back to Dashboard Button */}
      <div className="flex justify-center mt-8">
        <button
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default StudyMaterials;