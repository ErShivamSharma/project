import React, { useEffect, useState } from 'react';
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
      uploadedFile: null,
      teacherFile: 'math_homework.pdf' // Example file
    },
    {
      id: 5,
      subject: 'Science',
      title: 'Science Project',
      deadline: new Date('2024-08-17'),
      status: 'not submitted',
      feedback: 'Great work!',
      uploadedFile: null,
      teacherFile: 'science_project.pdf' // Example file
    },
    {
      id: 3,
      subject: 'Math',
      title: 'Algebra Assignment',
      deadline: new Date('2024-08-12'),
      status: 'not submitted',
      feedback: '',
      uploadedFile: null,
      teacherFile: 'algebra_assignment.pdf' // Example file
    }
  ]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleFileChange = (e, assignmentId) => {
    const file = e.target.files[0];
    setAssignments(assignments.map(assignment =>
      assignment.id === assignmentId ? {
        ...assignment,
        uploadedFile: file ? file.name : assignment.uploadedFile
      } : assignment
    ));
    setSelectedFile(file);
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
  useEffect(() => {
    fetch("http://localhost:8080/teacher/course")
      .then(response => response.json())
      .then(data => setAssignments(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

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
      <h2>{selectedSubject ? selectedSubject : null}</h2>
      {selectedSubject !== '' && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Teacher's File</th>
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
                  {assignment.teacherFile && (
                    <a href={`/files/teacher/${assignment.teacherFile}`} target="_blank" rel="noopener noreferrer">
                      {assignment.teacherFile}
                    </a>
                  )}
                </td>
                <td>
                  {assignment.uploadedFile && (
                    <a href={`path/to/uploads/${assignment.uploadedFile}`} target="_blank" rel="noopener noreferrer">
                      {assignment.uploadedFile}
                    </a>
                  )}
                </td>
                <td>
                  {assignment.status === 'not submitted' && getDeadlineClass(assignment.deadline) !== 'deadline-crossed' && (
                    <div>
                      <input type="file" onChange={(e) => handleFileChange(e, assignment.id)} />
                      <button onClick={() => handleSubmit(assignment.id)}>Submit</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentPage;
