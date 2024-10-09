const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendOtp } = require('../utils/emailServerce');
const crypto = require('crypto');
require('dotenv').config();

let otpStore = {}; 

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register a new user

const sendOtpForSignup = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('User already exists');

    const otp = crypto.randomInt(100000, 999999); // Generate 6-digit OTP
    otpStore[email] = { otp }; // Store OTP temporarily

    await sendOtp(email, otp);
    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Step 2: Verify OTP
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    console.log('Stored OTP:', otpStore[email]?.otp);
    console.log('Provided OTP:', otp);

    if (!otpStore[email]) throw new Error('OTP not found for this email');
    if (otpStore[email].otp.toString() !== otp.toString()) {
      throw new Error('Invalid OTP');
    }

    res.json({ message: 'OTP verified, proceed to signup' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Step 3: Complete Signup
const completeSignup = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    if (!otpStore[email]) throw new Error('OTP must be verified first');

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verified: true,
      },
    });

    delete otpStore[email]; // Cleanup OTP store
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Signup successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    // Check if the password matches
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid credentials');

    // Return JWT token
    const token = generateToken(user);
    res.json({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Get profile
const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user) throw new Error('User not found');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Cannot fetch user profile' });
  }
};

module.exports = {
  sendOtpForSignup, 
  verifyOtp, 
  completeSignup,
  login,
  getProfile,
};
