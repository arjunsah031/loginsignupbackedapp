// index.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes')
require('dotenv').config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes)

// Start the server


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
