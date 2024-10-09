const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Admin-only route
router.get('/admin', authenticateToken, adminMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});

module.exports = router;
