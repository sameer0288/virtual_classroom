const express = require('express');
const router = express.Router({ mergeParams: true });
const sessionController = require('../controllers/sessionController');

// Add a session to a class
router.post('/', sessionController.addSession);

// Get all sessions for a class
router.get('/', sessionController.getSessionsForClass);

// Get a specific session by ID
router.get('/:sessionId', sessionController.getSessionById);

// Update a session
router.put('/:sessionId', sessionController.updateSession);

// Delete a session
router.delete('/:sessionId', sessionController.deleteSession);

module.exports = router;
