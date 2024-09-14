const mongoose = require('mongoose');

// Define Class Schema
const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Class name is required'],
        minlength: [3, 'Class name must be at least 3 characters long'],
        maxlength: [100, 'Class name cannot exceed 100 characters']
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters'] // Optional: adjust as needed
    },
    sessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    }],
    instructor: { // Optional: if you want to associate a class with an instructor
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Instructor is required'] // Optional: make instructor required if applicable
    }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
