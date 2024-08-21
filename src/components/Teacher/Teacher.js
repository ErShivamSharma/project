import React, { useEffect, useState } from 'react';
import './Teacher.css'; // Import the updated CSS

import Notification from '../Notification/Notification';
import Navbar from '../NavigationBar/Navigationbar';

const TeacherPage = () => {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    courseName: '',
    subjectName: 'java',
    title: '',
    deadline: '',
    uploadedFile: null
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/course/all")
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
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
    const formData = new FormData();
    formData.append('cname', newAssignment.courseName); // Ensure this matches your backend
    formData.append('sname', newAssignment.subjectName); // Ensure this matches your backend
    formData.append('title', newAssignment.title);
    formData.append('deadline', newAssignment.deadline);
    if (newAssignment.uploadedFile) {
      formData.append('uploadedFile', newAssignment.uploadedFile);
    }
  
    fetch("http://localhost:8080/assignment/add", {
      method: "POST",
      body: formData
    })
      .then(response => {
        // Check if the response is ok
        if (!response.ok) {
          // Get the response text
          return response.text().then(text => {
            // Log the response text for debugging
            console.error('Error response:', text);
            throw new Error(`Network response was not ok. Status: ${response.status}. Body: ${text}`);
          });
        }
        // Check if the response is JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          // If not JSON, return response text
          return response.text();
        }
      })
      .then(data => {
        // Handle response data if it’s JSON
        if (typeof data === 'object') {
          setNotification({ message: 'Assignment successfully added!', type: 'success' });
          setNewAssignment({ courseName: 'java', subjectName: '', title: '', deadline: '', uploadedFile: null });
        } else {
          // Handle plain text or other formats if necessary
          setNotification({ message: 'Assignment successfully added!', type: 'success' });
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setNotification({ message: "Assignment not added", type: 'error' });
      });
  };
  

  const handleNotificationClose = () => {
    setNotification(null);
  };

  return (
    <div className='teacher'>
      <div className='nav-bar'>
        <Navbar first="New Assignment" second="Check Assignment" third="Check Student Status" />
      </div>
      <div className='assignment'>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Class</label>
            <select name="courseName" value={newAssignment.courseName} onChange={handleChange} required>
              <option value="">Select course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.courseName}>{course.courseName}</option>
              ))}
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
          <button type="submit">Assign Assignment</button>
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
                <td>{assignment.courseName}</td>
                <td>{assignment.title}</td>
                <td>{new Date(assignment.deadline).toDateString()}</td>
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
