import React, { useState } from 'react';
import './AdminPage.css';
import Notification from './Notification';
import Navbar from './Navigationbar';

const AdminPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

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

  const handleFileChange = (e) => {
    setNewAssignment({
      ...newAssignment,
      file: e.target.files[0],
    });
  };

  const handleInputChange = (e) => {
    setNewAssignment({
      ...newAssignment,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleClassSelect = (e) => {
    const classId = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedClasses([...selectedClasses, classId]);
    } else {
      setSelectedClasses(selectedClasses.filter(id => id !== classId));
    }
    setErrors({ ...errors, classes: '' });
  };

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!newAssignment.title) {
      formIsValid = false;
      newErrors.title = 'Title is required';
    }

    if (!newAssignment.description) {
      formIsValid = false;
      newErrors.description = 'Description is required';
    }

    if (!newAssignment.dueDate) {
      formIsValid = false;
      newErrors.dueDate = 'Due date is required';
    }

    if (selectedClasses.length === 0) {
      formIsValid = false;
      newErrors.classes = 'At least one class must be selected';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const addAssignment = () => {
    if (validateForm()) {
      setAssignments([...assignments, { ...newAssignment, classes: selectedClasses }]);
      setNewAssignment({ title: '', description: '', dueDate: '' });
      setSelectedClasses([]);
      setNotification({ message: 'Assignment successfully added!', type: 'success' });
    } else {
      setNotification({ message: 'Please fill in all required fields.', type: 'error' });
    }

  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm)
  );

  const handleNotificationClose = () => {
    setNotification(null);
  };

  return (
    <div className="admin-page">
      <Navbar />
      <h1>Assign Assignment</h1>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newAssignment.title}
          onChange={handleInputChange}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={newAssignment.description}
          onChange={handleInputChange}
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label>Upload File:</label>
        <input
          type="file"
          onChange={handleFileChange}
        />
      </div>


      <div className="form-group">
        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={newAssignment.dueDate}
          onChange={handleInputChange}
        />
        {errors.dueDate && <span className="error">{errors.dueDate}</span>}
      </div>
      <div className="class-list">
        <h3>Select Classes</h3>
        <input
          type="text"
          placeholder="Search classes..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {filteredClasses.map(cls => (
          <div key={cls.id} className="class-item">
            <label>
              <input
                type="checkbox"
                value={cls.id}
                checked={selectedClasses.includes(cls.id)}
                onChange={handleClassSelect}
              />
              <span>{cls.name}</span>
            </label>
          </div>
        ))}
        {errors.classes && <span className="error">{errors.classes}</span>}
      </div>
      <div className="button-container">
        <button onClick={addAssignment}>Assign</button>
      </div>

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

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}
    </div>

  );
};

export default AdminPage;
