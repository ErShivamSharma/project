// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './Navigationbar.css'; // Import a CSS file for styling


const Navbar = (props) => {
  if (props.first === "Home") {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>Welcome</h1>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">{props.first}</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">{props.second}</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">{props.third}</Link>
          </li>
        </ul>
      </nav>);
  } else {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>TeacherPage</h1>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/teacher" className="nav-link">{props.first}</Link>
          </li>
          <li className="nav-item">
            <Link to="/check" className="nav-link">{props.second}</Link>
          </li>
          <li className="nav-item">
            <Link to="/record" className="nav-link">{props.third}</Link>
          </li>
        </ul>
      </nav>);

  }

};

export default Navbar;
