import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');  // For success or error messages
    const [showPopup, setShowPopup] = useState(false);  // For controlling the popup
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, email, password };
        console.log("Sending user object:", user);

        try {
            const response = await axios.post('http://localhost:8080/api/supercook/postuserrecord',user,{
                headers: {
                    'Content-Type': 'application/json'  // Make sure to set this
                }
            });
            setMessage('Registration successful!');
            setShowPopup(true);
            handleClear();
            setTimeout(() => {
                // Redirect and pass user data
                navigate("/login");
            }, 1000);
            
        } catch (error) {
            if (error.response) {
                // Server responded with a status outside 2xx
                setMessage(error.response.data.message || 'Registration failed. Please try again.');
            } else if (error.request) {
                // No response received
                setMessage('No response from the server. Please try again later.');
            } else {
                // Other errors
                setMessage('An unexpected error occurred.');
            }
            setShowPopup(true);
        }
        
    };

    const handleBack = () => {
        navigate(-1);
    }

    const handleClear = () => {
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const handleClosePopup = () => {
        setShowPopup(false);  // Hide the popup
    };

    return (
    <div className="registration-wrapper">
      <div className="registration-container">
        <h2 className="registration-title">Register Form</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="username">Name:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" className="clear-button" onClick={handleClear}>Clear</button>
          </div>
        </form>
        <button type="button" className="back-button" onClick={handleBack}>Back</button>
      </div>
        
      {/* Popup Message */}
      {showPopup && (
        <div className="popup-message">
          <div className="popup-content">
            <p>{message}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;