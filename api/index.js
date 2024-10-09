// index.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const adminRoute = require("./routes/adminRoutes")
const productRoutes = require('./routes/productRoutes')

const cors = require('cors');

require('dotenv').config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000' // Allow your frontend
}));

// Auth routes
app.use('/api/auth', authRoutes);
app.use('/api', adminRoute)
app.use('/api/products', productRoutes)

// Start the server

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

