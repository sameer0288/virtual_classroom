const Comment = require('../models/Comment');
const Lecture = require('../models/Lecture');
const User = require('../models/User'); // Assuming you have a User model

// Add a comment to a lecture
exports.addComment = async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.lectureId);
        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }

        const newComment = new Comment({
            content: req.body.content,
            author: req.user.id, // Assuming req.user.id contains the ID of the logged-in user
            lecture: req.params.lectureId,
            parent: req.body.parent // Optional: supports nested comments
        });

        await newComment.save();

        lecture.comments.push(newComment._id);
        await lecture.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all comments for a lecture
exports.getCommentsForLecture = async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.lectureId).populate({
            path: 'comments',
            populate: {
                path: 'author', // Populate author details if needed
                select: 'name' // Adjust fields as needed
            }
        });

        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }
        res.status(200).json(lecture.comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific comment by ID
exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId).populate('author');
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a comment
exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true, runValidators: true });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const lecture = await Lecture.findById(comment.lecture);
        if (lecture) {
            lecture.comments.pull(req.params.commentId);
            await lecture.save();
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
