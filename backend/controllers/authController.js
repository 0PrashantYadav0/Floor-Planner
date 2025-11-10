const AuthService = require('../services/authService');

class AuthController {
    // Register new user
    static async register(req, res) {
        try {
            const { username, useremail, password, userimage } = req.body;

            // Validate input
            if (!username || !useremail || !password) {
                return res.status(400).json({ 
                    message: 'Please provide username, email, and password' 
                });
            }

            if (password.length < 6) {
                return res.status(400).json({ 
                    message: 'Password must be at least 6 characters long' 
                });
            }

            const result = await AuthService.register({
                username,
                useremail,
                password,
                userimage
            });

            res.status(201).json({
                message: 'User registered successfully',
                ...result
            });
        } catch (error) {
            if (error.message === 'User with this email already exists') {
                return res.status(409).json({ message: error.message });
            }
            res.status(500).json({ 
                message: 'Error registering user', 
                error: error.message 
            });
        }
    }

    // Login user
    static async login(req, res) {
        try {
            const { useremail, password } = req.body;

            // Validate input
            if (!useremail || !password) {
                return res.status(400).json({ 
                    message: 'Please provide email and password' 
                });
            }

            const result = await AuthService.login(useremail, password);

            res.status(200).json({
                message: 'Login successful',
                ...result
            });
        } catch (error) {
            if (error.message === 'Invalid email or password') {
                return res.status(401).json({ message: error.message });
            }
            res.status(500).json({ 
                message: 'Error logging in', 
                error: error.message 
            });
        }
    }

    // Get current user
    static async getCurrentUser(req, res) {
        try {
            const user = await AuthService.getUserById(req.user._id);
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ 
                message: 'Error fetching user', 
                error: error.message 
            });
        }
    }
}

module.exports = AuthController;

