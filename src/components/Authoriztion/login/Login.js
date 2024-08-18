import React, { useState } from 'react';
import './LoginPage.css'; // Import CSS for styling
import Navbar from '../../NavigationBar/Navigationbar';
import { Navigate } from 'react-router-dom';
import Notification from '../../Notification/Notification';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [notification, setNotification] = useState(null);
  const handleNotificationClose = () => {
    setNotification(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const credentials = { username, password };

    fetch('http://localhost:8080/register/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(async response => {
        if (response.ok) {
          // Handle successful login)
          const data = await response.json();
          if (data.role === 'student') {
            // Redirect to admin page
            Navigate = '/student';
          } else if (data.role === 'teacher') {
            // Redirect to teacher page   
            window.location = '/teacher';
          }
          console.log('Login successful:', data);
          setNotification({ message: 'login successfully', type: 'success' })
          return data;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setNotification({ message: 'login failed', type: 'error' })
      });

    
  }

  return (
    <div className=' login'>
      <div><Navbar first="Home" second="Login" third="Register" /></div>
      <div className="login-container">

        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="message">
          <p>Don't have an account? <a href="/register" setaction="register">Register here</a></p>
        </div>
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}
    </div>
  );
};
export default LoginPage;