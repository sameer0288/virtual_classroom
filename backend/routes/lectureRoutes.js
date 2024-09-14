const express = require('express');
const router = express.Router({ mergeParams: true });
const lectureController = require('../controllers/lectureController');

// Add a lecture to a session
router.post('/', lectureController.addLecture);

// Get all lectures for a session
router.get('/', lectureController.getLecturesForSession);

// Get a specific lecture by ID
router.get('/:lectureId', lectureController.getLectureById);

// Update a lecture
router.put('/:lectureId', lectureController.updateLecture);

// Delete a lecture
router.delete('/:lectureId', lectureController.deleteLecture);

module.exports = router;
