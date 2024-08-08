// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './Navigationbar.css'; // Import a CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Welcome</h1>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
