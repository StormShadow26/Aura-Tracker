import React, { useState,useEffect } from 'react';
import SubjectTable from './SubjectTable';

// import './CgpaBlock.css'

const CgpaBlock = ({ semName, cg, sg }) => {

  const [show, setShow] = useState(false);
  const [dee, setDee] = useState(false);
  const [numSubjects, setNumSubjects] = useState();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem('subjects'));
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

      // Create an array with unique objects for each subject
      const updatedSubjects = Array.from({ length: newNum }, (_, index) => ({
        name: subjects[index]?.name || '', // Keep existing names if any
        credit: subjects[index]?.credit || '',
        // Keep existing credits if any
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
      localStorage.setItem('subjects', JSON.stringify(subjects));
      toggleDee();
    }



  }

  return (
    <>
      <div className="cgpa-container container">
        <div className="content ">
          <div className="content-items upper ">
            <div className="content-items-item samester-name">
              <h3>Semster : -</h3>
              <span>{semName}</span>
            </div>
            <div className='content-items-item sgpa'>
              <h3>Sgpa : -</h3>
              <span>{sg}</span>
            </div>
          </div>
          <div className="content-items below ">
            <div className="content-items-item detail-view" onClick={toggleShow} >Detail View  <i className={`${show ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'} `} ></i></div>
            <div className='content-items-item cgpa'>
              <h3>Cgpa : -</h3>
              <span>{cg}</span>
            </div>
          </div>
        </div>
        

        
        <div className={`${show ? 'subject-details show' : 'subject-details not-show'}`}>
          <h3>
            <input className='noOfSbject'
              type="number"
              placeholder="ENTER NO OF SUBJECTS"
              value={numSubjects}
              onChange={handleNumSubjectsChange}
            />
          </h3>

          {/* Dynamically render input fields based on the number of subjects */}
          {Array.from({ length: numSubjects }).map((_, index) => (
            <div key={index} className="subject-input">
              <input
                type="text"
                placeholder={`Subject ${index + 1} Name`}
                value={subjects[index]?.name || ''}
                onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
              />
              <input
                type="number"
                placeholder={`Subject ${index + 1} Credit`}
                value={subjects[index]?.credit || ''}
                onChange={(e) => handleSubjectChange(index, 'credit', e.target.value)}
              />
            </div>

          ))}
          <button className='submit-btn' onClick={handleSubmit}>Submit</button>

        </div>


        <div className={`${dee ? 'table show' : 'table not-show'}`} >
          <SubjectTable subjects={subjects} sg={sg} />
        </div>


      </div>
    </>
  )
}

export default CgpaBlock