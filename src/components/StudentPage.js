import React, { useState } from 'react';
import './StudentPage.css'; // Import the updated CSS

const StudentPage = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      subject: 'Math',
      title: 'Math Homework',
      deadline: new Date('2024-08-10'),
      status: 'not submitted', // 'not submitted', 'submitted', 'checked'
      feedback: '',
      uploadedFile: null
    },
    {
      id: 2,
      subject: 'Science',
      title: 'Science Project',
      deadline: new Date('2024-08-15'),
      status: 'submitted',
      feedback: 'Great work!',
      uploadedFile: 'science_project.pdf'
    },
    {
      id: 3,
      subject: 'Math',
      title: 'Algebra Assignment',
      deadline: new Date('2024-08-12'),
      status: 'not submitted',
      feedback: '',
      uploadedFile: null
    }
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (assignmentId) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === assignmentId ? { 
        ...assignment, 
        status: 'submitted',
        uploadedFile: selectedFile ? selectedFile.name : assignment.uploadedFile 
      } : assignment
    ));
    // In a real application, you would also send the file to the server here.
    setSelectedFile(null);
  };

  const getDeadlineClass = (deadline) => {
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      return 'deadline-crossed';
    } else if (diffDays <= 2) {
      return 'deadline-near';
    } else {
      return '';
    }
  };

  const subjects = [...new Set(assignments.map(a => a.subject))];

  const filteredAssignments = selectedSubject 
    ? assignments.filter(a => a.subject === selectedSubject) 
    : assignments.filter(a => a.status === 'not submitted');

  return (
    <div>
      <h1>Assignments</h1>
      <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
        <option value="">Select a subject</option>
        {subjects.map(subject => (
          <option key={subject} value={subject}>{subject}</option>
        ))}
      </select>
      <h2>{selectedSubject ? selectedSubject : 'New Assignments'}</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Uploaded File</th>
            <th>Upload</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>{assignment.title}</td>
              <td className={getDeadlineClass(assignment.deadline)}>
                {assignment.deadline.toDateString()}
              </td>
              <td>{assignment.status}</td>
              <td>{assignment.feedback}</td>
              <td>
                {assignment.uploadedFile && (
                  <a href={`path/to/uploads/${assignment.uploadedFile}`} target="_blank" rel="noopener noreferrer">
                    {assignment.uploadedFile}
                  </a>
                )}
              </td>
              <td>
                {assignment.status === 'not submitted' && (
                  <div>
                    <input type="file" onChange={(e) => {
                      setCurrentAssignmentId(assignment.id);
                      handleFileChange(e);
                    }} />
                    <button onClick={() => handleSubmit(assignment.id)}>Submit</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentPage;
