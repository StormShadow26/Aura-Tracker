import React from 'react';
import './SubjectTable.css';

const SubjectTable = ({ subjects, sg }) => {
  subjects = subjects.map(item => ({
    ...item,
    credit: parseInt(item.credit, 10),
    grade: 0
  }));

  const requiredSG = sg;
  let totalCredits = 0;
  let assumedCG = 0.0;

  for (let key in subjects) {
    totalCredits += subjects[key].credit;
    subjects[key].grade = Math.floor(requiredSG);
    assumedCG += subjects[key].credit * subjects[key].grade;
  }

  assumedCG /= totalCredits;

  let i = 0;
  while (assumedCG < requiredSG) {
    let oldGrade = subjects[i].grade;
    subjects[i].grade++;
    assumedCG += (subjects[i].grade - oldGrade) * (subjects[i].credit / totalCredits);
    i++;
    if (i >= subjects.length) i = 0;
  }

  return (
    <section id="section31" className="section">
      <table id="table31" className="table">
        <thead>
          <tr>
            <th id="subject-name-header31" className="th">Subject Name</th>
            <th id="credits-header31" className="th">Credits</th>
            <th id="expected-grade-header31" className="th">Expected <br />Grade</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td id={`subject-name${index + 1}31`} className="td">{subject.name}</td>
              <td id={`credits${index + 1}31`} className="td">{subject.credit}</td>
              <td id={`expected-grade${index + 1}31`} className="td">{subject.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SubjectTable;
