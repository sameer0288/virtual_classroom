const mongoose = require('mongoose');

// Define Lecture Schema
const lectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Lecture title is required'],
        minlength: [3, 'Lecture title must be at least 3 characters long'],
        maxlength: [100, 'Lecture title cannot exceed 100 characters']
    },
    content: {
        type: String,
        maxlength: [2000, 'Lecture content cannot exceed 2000 characters'] // Optional: adjust as needed
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    session: { // Optional: if you want to associate a lecture with a session
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: [true, 'Session is required'] // Optional: make session required if applicable
    }
}, { timestamps: true });

module.exports = mongoose.model('Lecture', lectureSchema);
