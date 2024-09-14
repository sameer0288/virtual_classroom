const Session = require('../models/Session');
const Class = require('../models/Class');

// Add a session to a class
exports.addSession = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate required fields
        if (!title || !req.params.classId) {
            return res.status(400).json({ message: 'Title and class ID are required' });
        }

        const classObj = await Class.findById(req.params.classId);
        if (!classObj) {
            return res.status(404).json({ message: 'Class not found' });
        }

        // Create a new session
        const newSession = new Session({
            title,
            description,
            class: classObj._id // Associate the session with the class
        });

        // Save the session and update the class
        await newSession.save();
        classObj.sessions.push(newSession._id);
        await classObj.save();

        res.status(201).json(newSession);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all sessions for a class
exports.getSessionsForClass = async (req, res) => {
    try {
        const classObj = await Class.findById(req.params.classId).populate('sessions');
        if (!classObj) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json(classObj.sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific session by ID
exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a session
exports.updateSession = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate required fields
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const session = await Session.findByIdAndUpdate(
            req.params.sessionId,
            { title, description },
            { new: true, runValidators: true } // Ensure validators are run on update
        );
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json(session);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a session
exports.deleteSession = async (req, res) => {
    try {
        const session = await Session.findByIdAndDelete(req.params.sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Remove session reference from the associated class
        const classObj = await Class.findById(req.params.classId);
        if (classObj) {
            classObj.sessions.pull(req.params.sessionId);
            await classObj.save();
        }

        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
