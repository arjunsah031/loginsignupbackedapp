// middleware/adminMiddleware.js

const adminMiddleware = (req, res, next) => { 

  // Check if the user is authenticated and has the 'admin' role
  if (req.user && req.user.role === 'admin') {
    next(); // User is admin, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ error: 'Access denied, admin only' });
  }
};

module.exports = adminMiddleware;
