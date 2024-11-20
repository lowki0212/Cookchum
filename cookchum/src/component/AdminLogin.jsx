import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize navigate here

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email, // Updated to match backend structure
      password,
    };

    try {
      const response = await axios.post('http://localhost:8080/loginUser', loginData);
      if (response.data) {
        alert('Login successful!');
        navigate('/ManageRecipe'); // Redirect to /ManageRecipe
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleBack = () => {
    navigate('/'); // Navigate to the homepage
  };

  const handleSignUp = () => {
    navigate('/AdminSignUp'); // Navigate to the sign-up page
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Enter your email"
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <button onClick={handleBack} style={styles.backButton}>Back to Homepage</button> {/* Back Button */}
      <button onClick={handleSignUp} style={styles.signUpButton}>No account yet? Sign up as admin</button> {/* Sign up Button */}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '520px',
    margin: '250px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'block',
  },
  input: {
    width: '100%',
    maxWidth: '490px',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '15px',
    fontSize: '15px',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '510px',
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    color: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
    maxWidth: '510px',
  },
  signUpButton: {
    backgroundColor: '#f0f0f0',
    color: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
    maxWidth: '510px',
  },
};

export default AdminLogin;
