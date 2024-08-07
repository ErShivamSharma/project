// TeacherComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherComponent = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherName, setTeacherName] = useState('');

  useEffect(() => {
    axios.get('/teachers').then(response => {
      setTeachers(response.data);
    });
  }, []);

  const handleCreateTeacher = () => {
    axios.post('/teachers', { name: teacherName }).then(response => {
      setTeachers([...teachers, response.data]);
      setTeacherName('');
    });
  };

  return (
    <div>
      <h1>Teachers</h1>
      <input
        type="text"
        value={teacherName}
        onChange={e => setTeacherName(e.target.value)}
        placeholder="Teacher Name"
      />
      <button onClick={handleCreateTeacher}>Create Teacher</button>
      <ul>
        {teachers.map(teacher => (
          <li key={teacher.id}>{teacher.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherComponent;
