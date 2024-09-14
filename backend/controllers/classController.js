const Class = require('../models/Class');

// Create a new class
exports.createClass = async (req, res) => {
    try {
        const { name, description, sessions, instructorName } = req.body;

        // Validate required fields
        if (!name || !instructorName) {
            return res.status(400).json({ message: 'Name and instructor name are required' });
        }

        // Check if instructor exists by name
        const instructor = await User.findOne({ username: instructorName });
        if (!instructor) {
            return res.status(400).json({ message: 'Instructor not found' });
        }

        // Ensure sessions is an array or default to an empty array
        const sessionsArray = Array.isArray(sessions) ? sessions : [];

        // Create a new class instance
        const newClass = new Class({
            name,
            description,
            sessions: sessionsArray,
            instructor: instructor._id // Use instructor's ID for the class
        });

        // Save the class to the database
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all classes
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('instructor', 'username'); // Populate instructor field with username
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific class by ID
exports.getClassById = async (req, res) => {
    try {
        const classObj = await Class.findById(req.params.classId).populate('instructor', 'username'); // Populate instructor field with username
        if (!classObj) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json(classObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a class
exports.updateClass = async (req, res) => {
    try {
        const { name, description, sessions, instructor } = req.body;

        // Validate required fields
        if (!name || !instructor) {
            return res.status(400).json({ message: 'Name and instructor are required' });
        }

        const classObj = await Class.findByIdAndUpdate(
            req.params.classId,
            { name, description, sessions, instructor },
            { new: true, runValidators: true } // Ensure validators are run on update
        ).populate('instructor', 'username'); // Populate instructor field with username

        if (!classObj) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json(classObj);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a class
exports.deleteClass = async (req, res) => {
    try {
        const classObj = await Class.findByIdAndDelete(req.params.classId);
        if (!classObj) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
