import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClassPage from './pages/ClassPage';
import LecturePage from './pages/LecturePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import api from './api'; 
import './App.css'; 
import CreateClassPage from './pages/CreateClassPage';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  
  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.Authorization;
    }
  }, [token]);

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('authToken', token);
  };

  const handleSignup = (token) => {
    setToken(token);
    localStorage.setItem('authToken', token);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    delete api.defaults.headers.Authorization; 
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">Virtual Classroom</h1>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              {token ? (
                <>
                  <Link to="#" onClick={handleLogout}>Logout</Link>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </>
              )}
            </nav>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
            <Route path="/create-class" element={<CreateClassPage/>} />
            <Route path="/class/:classId" element={<ClassPage />} />
            <Route path="/class/:classId/lecture/:lectureId" element={<LecturePage />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 Virtual Classroom. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
