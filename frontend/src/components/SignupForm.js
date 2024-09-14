// src/SignupForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api'; // Adjust the path as needed
import "../SignupForm.css"
const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student'); // Default role
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await signup({ username, password, role });
      onSignup(response.data.token);
      navigate('/');  // Navigate to the homepage or any other route after signup
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);  // Set error message from server
      } else {
        setErrorMessage('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the signup page
  };

  return (
    <div className="signup-form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
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
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Signup'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <p className="signup-prompt">
        For Login? <span onClick={handleLoginRedirect} className="login-link">Login Here</span>
      </p>
    </div>
  );
};

export default SignupForm;
