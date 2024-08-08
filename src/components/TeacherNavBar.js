import React from 'react';
import { Link } from 'react-router-dom';
import './Navigationbar.css'; // Import a CSS file for styling

const TeacherNavBar = () => {
  return (
    <nav className="navbar">
    <div className="navbar-brand">
      <h1>Teacher's Page</h1>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/teacher" className="nav-link">Assign Assignments</Link>
        </li>
        <li className="nav-item">
          <Link to="/check" className="nav-link">Check Assignments</Link>
        </li>
        <li className="nav-item">
          <Link to="/record" className="nav-link">Check Student Status</Link>
        </li>
      </ul>
    </nav>
  );
};

export default TeacherNavBar;
