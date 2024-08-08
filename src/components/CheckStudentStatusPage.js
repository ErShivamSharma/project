import React, { useState } from 'react';

import Navbar from './Navigationbar';


const CheckStudentStatusPage = () => {
  const [students, setStudents] = useState([
    { name: 'Student 1', class: 'Class A', status: 'Assignment Submitted' },
    { name: 'Student 2', class: 'Class A', status: 'Assignment Checked' },
    { name: 'Student 3', class: 'Class B', status: 'Assignment Submitted' }
  ]);

  const [selectedClass, setSelectedClass] = useState('');
  
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const filteredStudents = selectedClass
    ? students.filter(student => student.class === selectedClass)
    : [];

  const classes = [...new Set(students.map(student => student.class))];

  return (
    <div>
      <div className='nav-bar'>
            <Navbar first = "New Assignment" second = "Check Assignment" third = "Check Student Status"/>
        </div>
      <h1>Student Status</h1>
      <div>
        <label>Select Class</label>
        <select value={selectedClass} onChange={handleClassChange}>
          <option value="">Select a class</option>
          {classes.map((className) => (
            <option key={className} value={className}>{className}</option>
          ))}
        </select>
      </div>
      {selectedClass && (
        <div>
          <h2>Status of Students in {selectedClass}</h2>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CheckStudentStatusPage;
