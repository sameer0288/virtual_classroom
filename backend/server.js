const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const classRoutes = require('./routes/classRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const lectureRoutes = require('./routes/lectureRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes'); 
const authMiddleware = require('./middleware/authMiddleware');

require('dotenv').config(); 

const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());

// Auth middleware
// Apply auth middleware only to routes that need authentication
app.use('/api/classes', authMiddleware);
app.use('/api/classes/:classId/sessions', authMiddleware);
app.use('/api/sessions/:sessionId/lectures', authMiddleware);
app.use('/api/lectures/:lectureId/comments', authMiddleware);

// Routes
app.use('/api/auth', authRoutes); // No auth middleware for auth routes
app.use('/api/classes', classRoutes);
app.use('/api/classes/:classId/sessions', sessionRoutes);
app.use('/api/sessions/:sessionId/lectures', lectureRoutes);
app.use('/api/lectures/:lectureId/comments', commentRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
