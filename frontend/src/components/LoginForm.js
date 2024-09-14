// src/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; // Adjust the path as needed
import '../LoginForm.css'; // Import the CSS for styling

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await login({ username, password });
      // Assuming the response contains the token
      onLogin(response.data.token);
      navigate('/'); // Navigate to the homepage or any other route after login
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // Set error message from server
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup'); // Redirect to the signup page
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <p className="signup-prompt">
        Not registered? <span onClick={handleSignUpRedirect} className="signup-link">Sign up here</span>
      </p>
    </div>
  );
};

export default LoginForm;
