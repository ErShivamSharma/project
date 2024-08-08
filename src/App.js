import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import AssignedAssign from './components/AssignedAssign';

import WelcomePage from './components/Welcome';
import Students from './components/students';
import StudentPage from './components/StudentPage';

import TeacherPage from './components/Teacher';
import CheckAssignmentsPage from './components/CheckingAssgin';
import CheckStudentStatusPage from './components/CheckStudentStatusPage';


const App = () => {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/status" element={<AssignedAssign/>}/>
        <Route path="/studentdata" element={<Students />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/check" element={<CheckAssignmentsPage />} />
        <Route path='/record' element={<CheckStudentStatusPage />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;