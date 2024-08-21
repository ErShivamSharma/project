import React, { useEffect, useState } from 'react';
import './CheckingAssin.css';
import Navbar from '../../NavigationBar/Navigationbar';

const CheckAssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
  const [currentFeedback, setCurrentFeedback] = useState('');

  // Handle course selection change
  const handleClassChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  // Handle feedback text area change
  const handleFeedbackChange = (e) => {
    setCurrentFeedback(e.target.value);
  };

  // Handle assignment checking and feedback submission
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

  // Fetch courses on component mount
  useEffect(() => {
    fetch("http://localhost:8080/course/all")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  // Fetch assignments when selected course changes
  useEffect(() => {
    if (selectedCourse) {
      fetch(`http://localhost:8080/assignmentrecord/all?subjectname=java&coursename=${selectedCourse}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text(); // Use text() to handle cases where JSON might not be properly formatted
        })
        .then(text => {
          try {
            const data = JSON.parse(text); // Parse the response text into JSON
            console.log('Fetched assignments:', data);
            setAssignments(data);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        })
        .catch(error => console.error('Error fetching assignments:', error));
    }
  }, [selectedCourse]);

  // Filter assignments based on selected course and status
  const filteredAssignments = assignments.filter(assignment => 
    (selectedCourse === '' || assignment.courseName === selectedCourse) &&
    (assignment.status === 'submitted' || assignment.status === 'undefined') // Show submitted and undefined statuses
  );

  console.log('Filtered assignments:', filteredAssignments);

  return (
    <div>
      <div className='nav-bar'>
        <Navbar first="New Assignment" second="Check Assignment" third="Check Student Status" />
      </div>
      <h1>Check Assignments</h1>
      <div>
        <label>Select Class</label>
        <select value={selectedCourse} onChange={handleClassChange}>
          <option value="">Select a class</option>
          {courses.map((course) => (
            <option key={course.id} value={course.courseName}>{course.courseName}</option>
          ))}
        </select>
      </div>
      <h2>Assignments for {selectedCourse}</h2>
      {selectedCourse && (
        <div>
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
                  <td>{assignment.studentId}</td>
                  <td>{assignment.title}</td>
                  <td>
                    {assignment.studentfile && (
                      <a href={`http://localhost:8080/files/${assignment.studentfile}`} target="_blank" rel="noopener noreferrer">
                        {assignment.studentfile}
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
