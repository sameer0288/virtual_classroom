const mongoose = require('mongoose');

// Define Session Schema
const sessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Session title is required'],
        minlength: [3, 'Session title must be at least 3 characters long'],
        maxlength: [100, 'Session title cannot exceed 100 characters']
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters'] // Optional: adjust as needed
    },
    lectures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture'
    }],
    class: { // Optional: if you want to associate a session with a class
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: [true, 'Class is required'] // Optional: make class required if applicable
    }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
