// AssignmentComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignmentComponent = () => {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [classId, setClassId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get('/assignments').then(response => {
      setAssignments(response.data);
    });
    axios.get('/teachers').then(response => {
      setTeachers(response.data);
    });
    axios.get('/classes').then(response => {
      setClasses(response.data);
    });
  }, []);

  const handleCreateAssignment = () => {
    axios.post('/assignments', { title, description, dueDate, classId, teacherId }).then(response => {
      setAssignments([...assignments, response.data]);
      setTitle('');
      setDescription('');
      setDueDate('');
      setClassId('');
      setTeacherId('');
    });
  };

  return (
    <div>
      <h1>Assignments</h1>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <select value={classId} onChange={e => setClassId(e.target.value)}>
        <option value="">Select Class</option>
        {classes.map(cls => (
          <option key={cls.id} value={cls.id}>
            {cls.name}
          </option>
        ))}
      </select>
      <select value={teacherId} onChange={e => setTeacherId(e.target.value)}>
        <option value="">Select Teacher</option>
        {teachers.map(teacher => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.name}
          </option>
        ))}
      </select>
      <button onClick={handleCreateAssignment}>Create Assignment</button>
      <ul>
        {assignments.map(assignment => (
          <li key={assignment.id}>
            {assignment.title} - {assignment.description} - Due: {assignment.dueDate} - Class: {assignment.aClass.name} - Teacher: {assignment.teacher.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentComponent;
