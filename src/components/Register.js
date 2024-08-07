import React, { useState } from 'react';
import './RegisterPage.css'; // Import CSS for styling
import Navbar from './Navigationbar';
import Notification from './Notification';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { firstName, lastName, username, email, password, confirmPassword } = formData;
    const [notification, setNotification] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        fetch("http://localhost:8080/register/add",{
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(formData)
        }).then(()=>{setNotification({ message: 'Assignment successfully added!', type: 'success' });})
        
        // Handle registration logic here
        console.log('Registration Data:', formData);
    };

    return (
        <div className=' register'>
    <div><Navbar/></div>
        <div className="registration-container">
           
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit" onClick={handleSubmit}>Register</button>
            </form>
            <div className="message">
                <p>Already have an account? <a href="/login" setaction="login">Login here</a></p>
            </div>
        </div>
    </div>   
    );
};

export default RegistrationPage;
