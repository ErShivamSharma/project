import React, { useEffect, useState } from 'react';
import Navbar from '../../NavigationBar/Navigationbar';

const CheckStudentStatusPage = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  // Fetch courses on component mount
  useEffect(() => {
    fetch("http://localhost:8080/course/all")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  // Fetch student statuses when selected course changes
  useEffect(() => {
    if (selectedCourse) {
      fetch(`http://localhost:8080/assignmentrecord/all?subjectname=java&coursename=${selectedCourse}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text(); // Use text() to handle cases where JSON might not be properly formatted
        })
        .then(text => {
          try {
            const data = JSON.parse(text); // Parse the response text into JSON
            console.log('Fetched students:', data);
            setStudents(data);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        })
        .catch(error => console.error('Error fetching students:', error));
    }
  }, [selectedCourse]);

  // Handle course selection change
  const handleClassChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  // Filter students based on the selected course
  const filteredStudents = selectedCourse
    ? students.filter(student => student.courseName === selectedCourse)
    : [];

  // Generate course options
  const courseOptions = courses.map(course => (
    <option key={course.id} value={course.courseName}>{course.courseName}</option>
  ));

  return (
    <div>
      <div className='nav-bar'>
        <Navbar first="New Assignment" second="Check Assignment" third="Check Student Status" />
      </div>
      <h1>Student Status</h1>
      <div>
        <label>Select Class</label>
        <select value={selectedCourse} onChange={handleClassChange}>
          <option value="">Select a class</option>
          {courseOptions}
        </select>
      </div>
      {selectedCourse && (
        <div>
          <h2>Status of Students in {selectedCourse}</h2>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.studentId}</td>
                  <td>{student.status || 'Not Available'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CheckStudentStatusPage;
