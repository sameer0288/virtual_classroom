const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Ensure you're using bcryptjs

// Define User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true, // Trims any leading or trailing whitespace from the username
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [50, 'Username cannot exceed 50 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        enum: ['Admin', 'Instructor', 'Student'],
        default: 'Student', // Default role if none is provided
        required: [true, 'Role is required']
    }
}, {
    timestamps: true // Add createdAt and updatedAt fields
});

// Password hashing middleware
UserSchema.pre('save', async function(next) {
    // Hash the password only if it is new or modified
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function(enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

// Ensure that Mongoose uses the model
module.exports = mongoose.model('User', UserSchema);
