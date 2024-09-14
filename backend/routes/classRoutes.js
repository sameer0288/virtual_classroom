const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Create a new class
router.post('/', classController.createClass);

// Get all classes
router.get('/', classController.getAllClasses);

// Get a specific class by ID
router.get('/:classId', classController.getClassById);

// Update a class
router.put('/:classId', classController.updateClass);

// Delete a class
router.delete('/:classId', classController.deleteClass);

module.exports = router;
