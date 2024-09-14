const mongoose = require('mongoose');

// Define Comment Schema
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: [1, 'Content must be at least 1 character long'],
        maxlength: [1000, 'Content cannot exceed 1000 characters'] // Optional: adjust as needed
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required'] // Ensure that each comment has an author
    },
    lecture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture',
        required: [true, 'Lecture is required'] // Ensure that each comment is associated with a lecture
    },
    parent: { // Optional: to support nested comments
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
}, { timestamps: true });


commentSchema.pre('save', function(next) {
    if (!this.content.trim()) {
        return next(new Error('Content cannot be empty'));
    }
    next();
});

module.exports = mongoose.model('Comment', commentSchema);
