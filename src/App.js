import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import AssignedAssign from './components/AssignedAssign';

import WelcomePage from './components/Welcome';


const App = () => {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/status" element={<AssignedAssign/>}/>
      </Routes>
    </div>
  </Router>
  );
};

export default App;