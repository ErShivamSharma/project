// src/WelcomePage.js

import React from 'react';
import Navbar from './Navigationbar'; // Import the Navbar component
import './Welcome.css'; // Import a CSS file for styling

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <Navbar first="Home" second="Login" third="Register"/> {/* Include the Navbar component */}
      
      <header className="welcome-header">
        <h1>Welcome to Your College Project!</h1>
        <p>Discover the Features and Benefits</p>
      </header>

      <section className="welcome-content">
        <h2>Hello and Welcome!</h2>
        <p>We’re thrilled to have you here. Our mission is to provide you with a simple, yet effective React welcome page for your college assignment.</p>
        
        <div className="features">
          <h3>What Can You Do Here?</h3>
          <ul>
            <li>Explore Our Features: Dive into our main features.</li>
            <li>Get Started: Click the button below to get started.</li>
            <li>Stay Connected: Follow us on social media for updates.</li>
          </ul>
        </div>

        <div className="call-to-action">
          <button onClick={() => alert('Button Clicked!')}>
            Get Started
          </button>
        </div>
      </section>

      <footer className="welcome-footer">
        <p>For any questions or support, feel free to contact us.</p>
        <nav>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default WelcomePage;
