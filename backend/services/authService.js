const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/jwt');

class AuthService {
    // Generate JWT token
    static generateToken(userId) {
        return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
    }

    // Register new user
    static async register(userData) {
        const { username, useremail, password, userimage } = userData;

        // Check if user already exists
        const existingUser = await User.findOne({ useremail });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Create new user
        const user = new User({
            username,
            useremail,
            password,
            userimage: userimage || ''
        });

        await user.save();

        // Generate token
        const token = this.generateToken(user._id);

        // Return user data without password
        const userObject = user.toObject();
        delete userObject.password;

        return {
            user: userObject,
            token
        };
    }

    // Login user
    static async login(email, password) {
        // Find user by email
        const user = await User.findOne({ useremail: email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // Generate token
        const token = this.generateToken(user._id);

        // Return user data without password
        const userObject = user.toObject();
        delete userObject.password;

        return {
            user: userObject,
            token
        };
    }

    // Get user by ID
    static async getUserById(userId) {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}

module.exports = AuthService;

