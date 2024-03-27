import React, { useState } from 'react';
import { useAuth } from '../authFile/AuthContext'; // Adjust the path as needed
import AdminProfileCard from './AdminProfileCard';

const Login = () => {
    const { isAdmin, login } = useAuth();
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            login(data.isAdmin);
            console.log('Login successful:', data);

            setFormData({ username: '', password: '' });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    if (isAdmin) {
        return  <AdminProfileCard /> 
    }
    

    return (
        <div className="login-page">
            <div className="login-form">
                <h1>This is the login page</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-field">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;






