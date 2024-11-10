import React, { useState, useEffect } from 'react';
import SubjectTable from './SubjectTable';
import './CgpaBlock.css';

const CgpaBlock = ({ semName, cg, sg }) => {
  const [show, setShow] = useState(false);
  const [dee, setDee] = useState(false);
  const [numSubjects, setNumSubjects] = useState();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem('subjects30'));
    if (storedSubjects) {
      setSubjects(storedSubjects);
      setNumSubjects(storedSubjects.length);
    }
  }, []);

  function toggleShow() {
    setShow(!show);
    setDee(false);
  }

  function toggleDee() {
    setShow(false);
    setDee(true);
  }

  const handleNumSubjectsChange = (e) => {
    const value = e.target.value;

    if (value === '' || isNaN(value)) {
      setNumSubjects(0);
      setSubjects([]);
    } else {
      let newNum = parseInt(value, 10);
      if (newNum > 10) {
        newNum = 10;
      }

      const updatedSubjects = Array.from({ length: newNum }, (_, index) => ({
        name: subjects[index]?.name || '',
        credit: subjects[index]?.credit || '',
      }));

      setNumSubjects(newNum);
      setSubjects(updatedSubjects);
    }
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
    setSubjects(updatedSubjects);
  };

  const handleSubmit = () => {
    let error = false;
    subjects.forEach((subject, index) => {
      if (!subject.name || !subject.credit) {
        error = true;
        alert(`Please fill in all fields for Subject ${index + 1}`);
      }
    });
    if (!error) {
      localStorage.setItem('subjects30', JSON.stringify(subjects));
      toggleDee();
    }
  };

  return (
    <>
      <div id="cgpa-container30" className="cgpa-container">
        <div id="content30" className="content">
          <div id="upper-content30" className="content-items upper">
            <div id="semester-name30" className="content-items-item semester-name">
              <h3>Semester:</h3>
              <span>{semName}</span>
            </div>
            <div id="sgpa30" className="content-items-item sgpa">
              <h3>SGPA:</h3>
              <span>{sg}</span>
            </div>
          </div>
          <div id="below-content30" className="content-items below">
            <div id="detail-view30" className="content-items-item detail-view" onClick={toggleShow}>
              Detail View <i className={`${show ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}`} />
            </div>
            <div id="cgpa30" className="content-items-item cgpa">
              <h3>CGPA:</h3>
              <span>{cg}</span>
            </div>
          </div>
        </div>

        <div id="subject-details30" className={`${show ? 'subject-details show' : 'subject-details not-show'}`}>
          <h3>
            <input
              id="num-subjects30"
              className="noOfSubject"
              type="number"
              placeholder="ENTER NO OF SUBJECTS"
              value={numSubjects}
              onChange={handleNumSubjectsChange}
            />
          </h3>

          {Array.from({ length: numSubjects }).map((_, index) => (
            <div key={index} id={`subject-input${index + 1}30`} className="subject-input">
              <input
                id={`subject-name${index + 1}30`}
                type="text"
                placeholder={`Subject ${index + 1} Name`}
                value={subjects[index]?.name || ''}
                onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
              />
              <input
                id={`subject-credit${index + 1}30`}
                type="number"
                placeholder={`Subject ${index + 1} Credit`}
                value={subjects[index]?.credit || ''}
                onChange={(e) => handleSubjectChange(index, 'credit', e.target.value)}
              />
            </div>
          ))}
          <button id="submit-btn30" className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <div id="table30" className={`${dee ? 'table show' : 'table not-show'}`}>
          <SubjectTable subjects={subjects} sg={sg} />
        </div>
      </div>
    </>
  );
};

export default CgpaBlock;
