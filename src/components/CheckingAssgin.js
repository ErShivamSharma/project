import React, { useState } from 'react';
import './CheckingAssin.css';

import Navbar from './Navigationbar';

const CheckAssignmentsPage = () => {
  const [assignments, setAssignments] = useState([
    {
      id: '',
      class: '',
      student: '',
      title: '',
      uploadedFile: '',
      feedback: '',
      status: ''
    },
    {
      id: 2,
      class: 'Class A',
      student: 'Student 2',
      title: 'Science Project',
      uploadedFile: 'science_project.pdf',
      feedback: '',
      status: 'submitted'
    },
    {
      id: 3,
      class: 'Class B',
      student: 'Student 3',
      title: 'History Essay',
      uploadedFile: 'history_essay.pdf',
      feedback: '',
      status: 'not submitted'
    }
  ]);

  const [selectedClass, setSelectedClass] = useState('');
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
  const [currentFeedback, setCurrentFeedback] = useState('');

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleFeedbackChange = (e) => {
    setCurrentFeedback(e.target.value);
    
  };

  const handleCheckAssignment = (assignmentId) => {
    setAssignments(assignments.map(assignment =>
      assignment.id === assignmentId ? {
        ...assignment,
        feedback: currentFeedback,
        status: 'checked'
      } : assignment
    ));
    setCurrentAssignmentId(null);
    setCurrentFeedback('');
  };

  const filteredAssignments = selectedClass ? assignments.filter(a => a.class === selectedClass) : [];

  const classes = [...new Set(assignments.map(a => a.class))];

  return (
    <div>
      <div className='nav-bar'>
            <Navbar first = "New Assignment" second = "Check Assignment" third = "Check Student Status"/>
        </div>
      <h1>Check Assignments</h1>
      <div>
        <label>Select Class</label>
        <select value={selectedClass} onChange={handleClassChange}>
          <option value="">Select a class</option>
          {classes.map((className) => (
            <option key={className} value={className}>{className}</option>
          ))}
        </select>
      </div>
      {selectedClass && (
        <div>
          <h2>Assignments for {selectedClass}</h2>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Title</th>
                <th>Uploaded File</th>
                <th>Status</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.student}</td>
                  <td>{assignment.title}</td>
                  <td>
                    {assignment.uploadedFile && (
                      <a href={`path/to/uploads/${assignment.uploadedFile}`} target="_blank" rel="noopener noreferrer">
                        {assignment.uploadedFile}
                      </a>
                    )}
                  </td>
                  <td>{assignment.status}</td>
                  <td>
                    {assignment.status === 'submitted' && currentAssignmentId === assignment.id ? (
                      <textarea
                        value={currentFeedback}
                        onChange={handleFeedbackChange}
                        placeholder="Enter feedback"
                      />
                    ) : (
                      assignment.feedback
                    )}
                  </td>
                  <td>
                    {assignment.status === 'submitted' && currentAssignmentId === assignment.id ? (
                      <button onClick={() => handleCheckAssignment(assignment.id)}>
                        Check Assignment
                      </button>
                    ) : (
                      <button onClick={() => {
                        setCurrentAssignmentId(assignment.id);
                        setCurrentFeedback(assignment.feedback || '');
                      }}>
                        Provide Feedback
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CheckAssignmentsPage;
