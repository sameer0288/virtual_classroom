import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {createClass} from "../api"
import '../CreateClassPage.css'; 

const CreateClassPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sessions, setSessions] = useState('');
  const [instructor, setInstructor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(createClass, {
        name,
        description,
        sessions: sessions.split(',').map(session => session.trim()), // Convert comma-separated string to array
        instructor,
      });
      navigate('/'); // Redirect to homepage or another page after successful creation
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // Set error message from server
      } else {
        setErrorMessage('Failed to create class. Please try again.');
      }
    }
  };

  return (
    <div className="create-class-page">
      <h1>Create New Class</h1>
      <form onSubmit={handleSubmit} className="create-class-form">
        <div className="form-group">
          <label htmlFor="class-name">Class Name:</label>
          <input
            id="class-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter class name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="class-description">Description:</label>
          <textarea
            id="class-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter class description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="class-sessions">Sessions (comma-separated):</label>
          <input
            id="class-sessions"
            type="text"
            value={sessions}
            onChange={(e) => setSessions(e.target.value)}
            placeholder="Enter sessions"
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructor-id">Instructor ID:</label>
          <input
            id="instructor-id"
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            required
            placeholder="Enter instructor ID"
          />
        </div>
        <button type="submit" className="submit-button">Create Class</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default CreateClassPage;
