// controllers/authController.js
const authService = require('../services/authService');

// Register a new user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await authService.registerUser(name, email, password);
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.loginUser(email, password);
    res.json({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Get profile
const getProfile = async (req, res) => {
  try {
    const user = await authService.getUserById(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Cannot fetch user profile' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
