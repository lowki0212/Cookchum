import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('/api/supercook/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Login successful!');
                setTimeout(() => {
                    // Redirect and pass user data
                    navigate('/', { state: { userId: data.userId, username: data.username } });
                }, 1000);
            } else {
                const errorText = await response.text();
                setErrorMessage(errorText || 'Login failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage('An error occurred while logging in.');
        }
    };

    // Redirect to Register page
    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="login-wrapper">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="show-password-container">
                        <input
                            type="checkbox"
                            id="show-password"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label htmlFor="show-password">Show Password</label>
                    </div>
                </div>

                <button type="submit" className="login-button">Login</button>
                <button type="button" onClick={handleRegisterRedirect} className="register-button">Register</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
        </div>
    );
};

export default LoginForm;