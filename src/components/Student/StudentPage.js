import React, { useEffect, useState } from 'react';
import './StudentPage.css';
import Notification from '../Notification/Notification';

const StudentPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Fetch subjects
    fetch("http://localhost:8080/subject/allsubject")
      .then(response => response.json())
      .then(data => setSubjects(data))
      .catch(error => console.error('Error fetching subjects:', error));

  }, []);

  useEffect(() => {
    // Fetch assignments by subject
    if (selectedSubject) {
      fetch(`http://localhost:8080/assignment/all?subjectname=${selectedSubject}&coursename=pg dac`)
        .then(response => response.json())
        .then(data => {
          const updatedAssignments = updateAssignmentsStatus(data);
          setAssignments(updatedAssignments);
        })
        .catch(error => console.error('Error fetching assignments:', error));
    }
  }, [selectedSubject]);

  const handleFileChange = (e, assignmentId) => {
    const file = e.target.files[0];
    setAssignments(assignments.map(assignment =>
      assignment.id === assignmentId ? {
        ...assignment,
        studentFile: file ? file.name : assignment.studentFile
      } : assignment
    ));
    setSelectedFile(file);
  };

  const updateAssignmentsStatus = (assignments) => {
    const today = new Date();
    return assignments.map(assignment => {
      const deadlineDate = new Date(assignment.deadline);
      if (deadlineDate < today && assignment.status !== 'submitted' && assignment.status !== 'checked') {
        return { ...assignment, status: 'not submitted' };
      }
      return assignment;
    });
  };

  const handleSubmit = (assignmentId) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (!assignment) {
      setNotification({ message: 'Assignment not found.', type: 'error' });
      return;
    }
    
    const formData = new FormData();
    
    formData.append('studentId', '1110'); // Replace with actual student ID
    formData.append('cname', 'pg dac'); // Replace with actual course name
    formData.append('sname', assignment.subjectName); // Assignment's subject name
    formData.append('title', assignment.title); // Assignment's title
    formData.append('deadline', assignment.deadline); // Assignment's deadline
    formData.append('status', assignment.status); // Assignment's status
    formData.append('filename', assignment.filename); // Teacher's file
    
    if (selectedFile) {
      formData.append('studentFile', selectedFile);
    }
    
    fetch("http://localhost:8080/assignmentrecord/add", {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          // Log response text for debugging
          console.error('Server Response:', text);
          throw new Error(`Error: ${text}`);
        });
      }
      return response.text(); // Use text() to handle non-JSON responses
    })
    .then(data => {
      // Handle response data as plain text
      setAssignments(assignments.map(a =>
        a.id === assignmentId ? { ...a, status: 'submitted' } : a
      ));
      setSelectedFile(null);
      setNotification({ message: 'Assignment successfully added!', type: 'success' });
    })
    .catch(error => {
      console.error('Error submitting assignment:', error);
      setNotification({ message: error.message, type: 'error' });
    });
  };
  


  const getDeadlineClass = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      return 'deadline-crossed';
    } else if (diffDays <= 2) {
      return 'deadline-near';
    } else {
      return '';
    }
  };

  const filteredAssignments = selectedSubject
    ? assignments.filter(a => a.subjectName === selectedSubject)
    : assignments.filter(a => a.status === 'not submitted' || a.status === ''|| a.status === null);

  console.log('Filtered Assignments:', filteredAssignments);

  return (
    <div>
      <h1>Assignments</h1>
      <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
        <option value="">Select a subject</option>
        {subjects.map(subject => (
          <option key={subject} value={subject}>{subject}</option>
        ))}
      </select>
      <h2>{selectedSubject ? selectedSubject : null}</h2>
      {selectedSubject && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Deadline</th>
              <th>Status</th>
              
              <th>Teacher's File</th>
              <th>Uploaded File</th>
              <th>Upload</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.title}</td>
                <td className={getDeadlineClass(assignment.deadline)}>
                  {new Date(assignment.deadline).toDateString()}
                </td>
                <td>{assignment.status}</td>
                
                <td>
                  {assignment.filename && (
                    <a href={`C:/Users/lenovo/Desktop/Assignment/${assignment.filename}`} target="_blank" rel="noopener noreferrer">
                      {assignment.filename}
                    </a>
                  )}
                </td>
                <td>
                  {assignment.studentFile && (
                    <a href={`/files/student/${assignment.studentFile}`} target="_blank" rel="noopener noreferrer">
                      {assignment.studentFile}
                    </a>
                  )}
                </td>
                <td>
                  {(assignment.status !== 'submitted'||assignment.status !== 'checked') && getDeadlineClass(assignment.deadline) !== 'deadline-crossed'
 && (
                    <div>
                      <input type="file" onChange={(e) => handleFileChange(e, assignment.id)} />
                      <button onClick={() => handleSubmit(assignment.id)}>Submit</button>
                    </div>
                  )}
                </td>
                <td>{assignment.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
    </div>
  );
};

export default StudentPage;
