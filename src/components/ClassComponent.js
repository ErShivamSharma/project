// ClassComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassComponent = () => {
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState('');

  useEffect(() => {
    axios.get('/classes').then(response => {
      setClasses(response.data);
    });
  }, []);

  const handleCreateClass = () => {
    axios.post('/classes', { name: className }).then(response => {
      setClasses([...classes, response.data]);
      setClassName('');
    });
  };

  return (
    <div>
      <h1>Classes</h1>
      <input
        type="text"
        value={className}
        onChange={e => setClassName(e.target.value)}
        placeholder="Class Name"
      />
      <button onClick={handleCreateClass}>Create Class</button>
      <ul>
        {classes.map(cls => (
          <li key={cls.id}>{cls.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClassComponent;
