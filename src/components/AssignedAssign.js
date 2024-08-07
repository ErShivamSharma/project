import React, { useState } from 'react';
import './AdminPage.css';
import './Admin';
import Notification from './Notification';

const AdminPage = () => {
  const [assignments, setAssignments] = useState([]);
  
  
  
  const classes = [
    { id: 1, name: 'PG -DAC' },
    { id: 2, name: 'PG - VLSI' },
    { id: 3, name: 'PG-dessd ' },
  ];

  const fetchAssignments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/assignments');
      const data = await response.json();
      setAssignments(data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  };


  return (
    <div className="admin-page">
      

      <h2>Assigned Assignments</h2>
      <ul className="assignment-list">
        {assignments.map((assignment, index) => (
          <li key={index}>
            <h3>{assignment.title}</h3>
            <p>{assignment.description}</p>
            <p>Due Date: {assignment.dueDate}</p>
            <p>Assigned to: {assignment.classes.map(id => classes.find(cls => cls.id === id).name).join(', ')}</p>
          </li>
        ))}
      </ul>

     
    </div>
  );
};

export default AdminPage;
