import React, { useState } from 'react';
import './LoginPage.css'; // Import CSS for styling
import Navbar from './Navigationbar';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };
    return (
        <div className=' login'>
            <div><Navbar /></div>
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
        </div>
    );
};
export default LoginPage;