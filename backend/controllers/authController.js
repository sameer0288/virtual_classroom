const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
        expiresIn: '1000h'  // Adjust token expiration as needed
    });
};

// Login Controller
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Match password (using bcryptjs)
        const isMatch = await user.matchPassword(password); // Use the UserSchema's method
        console.log('Password match:', isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT with user role
        const token = generateToken(user._id, user.role);

        // Send token and user info
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role // Include user role in the response
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Signup Controller
exports.signup = async (req, res) => {
    const { username, password, role } = req.body;

    try {
       
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Validate role
        const validRoles = ['Admin', 'Instructor', 'Student'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Create a new user with plain text password
        const newUser = new User({
            username,
            password, // This will be hashed automatically by the schema middleware
            role
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token with user role
        const token = generateToken(newUser._id, newUser.role);

        // Send the token as a response
        res.status(201).json({ token });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
