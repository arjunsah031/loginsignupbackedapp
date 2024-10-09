// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Register route

router.post('/send-otp', authController.sendOtpForSignup);
router.post('/verify-otp', authController.verifyOtp);
router.post('/complete-signup', authController.completeSignup);

// Login route
router.post('/login', authController.login);

// Protected route: Get profile
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router;
