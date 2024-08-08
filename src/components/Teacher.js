import React, { useState } from 'react';
import './Teacher.css'; // Import the updated CSS
import TeacherNavBar from './TeacherNavBar';
import Notification from './Notification';


const TeacherPage = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      class: 'Class A',
      title: 'Math Homework',
      deadline: new Date('2024-08-10'),
      uploadedFile: null
    },
    {
      id: 2,
      class: 'Class B',
      title: 'Science Project',
      deadline: new Date('2024-08-15'),
      uploadedFile: 'science_project.pdf'
    }
  ]);

  const [newAssignment, setNewAssignment] = useState({
    class: '',
    title: '',
    deadline: '',
    uploadedFile: null
  });

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
    setAssignments(prevState => [
      ...prevState,
      {
        ...newAssignment,
        id: prevState.length + 1,
        deadline: new Date(newAssignment.deadline)
      }
    ]);
    setNotification({ message: 'Assignment added successfully!', type: 'success' });
    setNewAssignment({ class: '', title: '', deadline: '', uploadedFile: null });
  };
  const [notification, setNotification] = useState(null);
  const handleNotificationClose = () => {
    setNotification(null);
  };

  return (
    <div className='teacher'>
        <div className='nav-bar'>
            <TeacherNavBar/>
        </div>
      <div className='assignment'>
      
      <form onSubmit={handleSubmit}>
        <div>
            
          <label>Class</label>
          <select name="class" value={newAssignment.class} onChange={handleChange} required>
            <option value="">Select Class</option>
            <option value="Class A">Class A</option>
            <option value="Class B">Class B</option>
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
