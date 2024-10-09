// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate user
const authenticateToken = (req, res, next) => {
  
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ error: 'Access denied, no token provided' });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user; // Attach the decoded user object to req.user
    next();
  });
};

module.exports = {
  authenticateToken,
};
