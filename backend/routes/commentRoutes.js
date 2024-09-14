const express = require('express');
const router = express.Router({ mergeParams: true });
const commentController = require('../controllers/commentController');

// Add a comment to a lecture
router.post('/', commentController.addComment);

// Get all comments for a lecture
router.get('/', commentController.getCommentsForLecture);

// Get a specific comment by ID
router.get('/:commentId', commentController.getCommentById);

// Update a comment
router.put('/:commentId', commentController.updateComment);

// Delete a comment
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
