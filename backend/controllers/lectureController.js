const Lecture = require('../models/Lecture');
const Session = require('../models/Session');

// Add a lecture to a session
exports.addLecture = async (req, res) => {
    try {
        const { title, content } = req.body;
        const sessionId = req.params.sessionId;

        // Validate required fields
        if (!title || !sessionId) {
            return res.status(400).json({ message: 'Title and session ID are required' });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Create a new lecture and associate it with the session
        const newLecture = new Lecture({
            title,
            content,
            session: sessionId
        });

        // Save the lecture and update the session
        await newLecture.save();
        session.lectures.push(newLecture._id);
        await session.save();

        res.status(201).json(newLecture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all lectures for a session
exports.getLecturesForSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.sessionId).populate('lectures');
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json(session.lectures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific lecture by ID
exports.getLectureById = async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.lectureId);
        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }
        res.status(200).json(lecture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a lecture
exports.updateLecture = async (req, res) => {
    try {
        const { title, content } = req.body;

        // Validate required fields
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const lecture = await Lecture.findByIdAndUpdate(
            req.params.lectureId,
            { title, content },
            { new: true, runValidators: true } // Ensure validators are run on update
        );
        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }
        res.status(200).json(lecture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a lecture
exports.deleteLecture = async (req, res) => {
    try {
        const lecture = await Lecture.findByIdAndDelete(req.params.lectureId);
        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }

        // Remove lecture reference from the associated session
        const session = await Session.findById(lecture.session);
        if (session) {
            session.lectures.pull(req.params.lectureId);
            await session.save();
        }

        res.status(200).json({ message: 'Lecture deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
