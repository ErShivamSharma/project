import React, { useEffect, useState } from 'react';
import './Teacher.css'; // Import the updated CSS

import Notification from './Notification';
import Navbar from './Navigationbar';


const TeacherPage = () => {

  const [assignments, setAssignments] = useState([
    {
      id: '',
      class: '',
      title: '',
      deadline: new Date(''),
      uploadedFile: null
    }
  ]);

  const [newAssignment, setNewAssignment] = useState({
    class: '',
    title: '',
    deadline: '',
    uploadedFile: null
  });
  useEffect(() => {
    fetch("http://localhost:8080/assignments")
      .then(response => response.json())
      .then(data => setAssignments(data))
      .catch(error => console.error('Error fetching assignments:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setNewAssignment(prevState => ({
      ...prevState,
      uploadedFile: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewAssignment({ class: '', title: '', deadline: '', uploadedFile: null });
    fetch("http://localhost:8080/assignments/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(newAssignment)
   })
   .then(()=>{setNotification({ message: 'Assignment successfully added!', type: 'success' });})
   .then(() =>  setAssignments(prevState => [
    ...prevState,
    {
      ...newAssignment,
      id: prevState.length + 1,
      deadline: new Date(newAssignment.deadline)
    }
    
  ]))
   .catch(() => {setNotification({ message: "Assignment not added", type: 'error' });});
  };
  const [notification, setNotification] = useState(null);
  const handleNotificationClose = () => {
    setNotification(null);
  };

  return (
    <div className='teacher'>
        <div className='nav-bar'>
            <Navbar first = "New Assignment" second = "Check Assignment" third = "Check Student Status"/>
        </div>
      <div className='assignment'>
      
      <form onSubmit={handleSubmit}>
        <div>
            
          <label>Class</label>
          <select name="class" value={newAssignment.class} onChange={handleChange} required>
            <option value="">Select Class</option>
            <option value="Class A">{assignments.class}</option>
          </select>
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newAssignment.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={newAssignment.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Upload File</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit" >Assign Assignment</button>
        
      </form>
      <h2>Current Assignments</h2>
      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Title</th>
            <th>Deadline</th>
            <th>Uploaded File</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>{assignment.class}</td>
              <td>{assignment.title}</td>
              <td>{assignment.deadline.toDateString()}</td>
              <td>
                {assignment.uploadedFile && (
                  <a href={`path/to/uploads/${assignment.uploadedFile}`} target="_blank" rel="noopener noreferrer">
                    {assignment.uploadedFile.name || assignment.uploadedFile}
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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

export default TeacherPage;
