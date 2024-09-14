import axios from 'axios';

// Create an axios instance with a default base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
});

// Set a default header for all requests except login and signup
api.interceptors.request.use((config) => {
  // Check if the request URL is for login or signup
  if (!config.url.includes('/auth/login') && !config.url.includes('/auth/signup')) {
    // Add Authorization header if token exists
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Set the Authorization header
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const signup = (credentials) => api.post('/auth/signup', credentials);

// API functions
export const getClasses = () => api.get('/classes');

// Create a new class
export const createClass = (classData) => api.post('/classes', classData);

// Get a specific class by ID
export const getClassById = (classId) => api.get(`/classes/${classId}`);

// Update a class
export const updateClass = (classId, classData) => api.put(`/classes/${classId}`, classData);

// Delete a class
export const deleteClass = (classId) => api.delete(`/classes/${classId}`);

// Get sessions for a specific class
export const getClassSessions = (classId) => api.get(`/classes/${classId}/sessions`);

// Get a specific lecture by ID
export const getLecture = (classId, lectureId) => api.get(`/classes/${classId}/lectures/${lectureId}`);

// Fetch comments for a specific lecture
export const getComments = (lectureId) => api.get(`/lectures/${lectureId}/comments`);

// Post a new comment for a specific lecture
export const postComment = (lectureId, comment) => api.post(`/lectures/${lectureId}/comments`, comment);

// Enroll a student in a class
export const enrollStudent = (classId, studentId) => api.post(`/classes/${classId}/enroll`, { studentId });

export default api;
