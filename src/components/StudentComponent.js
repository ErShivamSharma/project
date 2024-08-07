// StudentComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentComponent = () => {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [classId, setClassId] = useState('');

  useEffect(() => {
    axios.get('/students').then(response => {
      setStudents(response.data);
    });
  }, []);

  const handleCreateStudent = () => {
    axios.post('/students', { name: studentName, classId }).then(response => {
      setStudents([...students, response.data]);
      setStudentName('');
      setClassId('');
    });
  };

  return (
    <div>
      <h1>Students</h1>
      <input
        type="text"
        value={studentName}
        onChange={e => setStudentName(e.target.value)}
        placeholder="Student Name"
      />
      <input
        type="text"
        value={classId}
        onChange={e => setClassId(e.target.value)}
        placeholder="Class ID"
      />
      <button onClick={handleCreateStudent}>Create Student</button>
      <ul>
        {students.map(student => (
          <li key={student.id}>{student.name} - Class ID: {student.classId}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentComponent;
