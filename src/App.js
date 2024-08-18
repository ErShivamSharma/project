import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Authoriztion/register/Register';
import Login from './components/Authoriztion/login/Login';

import AssignedAssign from './components/AssignedAssign';

import WelcomePage from './components/Welcome';
import Students from './components/Student/students';
import StudentPage from './components/Student/StudentPage';

import TeacherPage from './components/Teacher/Teacher';
import CheckAssignmentsPage from './components/Teacher/checkAssginment/CheckingAssgin';
import CheckStudentStatusPage from './components/Teacher/StudentStats/CheckStudentStatusPage';


const App = () => {
  return (
    <Router>
    <div>
      <Routes>
      <Route path="/" element={<WelcomePage/>} />

        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/check" element={<CheckAssignmentsPage />} />
        <Route path='/record' element={<CheckStudentStatusPage />} />

        <Route path="/status" element={<AssignedAssign/>}/>
        <Route path="/studentdata" element={<Students />} />
        <Route path="/student" element={<StudentPage />} />
        
      </Routes>
    </div>
  </Router>
  );
};

export default App;