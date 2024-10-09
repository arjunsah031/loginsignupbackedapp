// src/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken } = require("../middleware/authMiddleware");
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', authenticateToken, adminMiddleware,  productController.createProduct);
router.get('/',  productController.getAllProducts);
router.get('/:id', authenticateToken, adminMiddleware, productController.getProductById);
router.put('/:id', authenticateToken, adminMiddleware, productController.updateProduct);
router.delete('/:id', authenticateToken, adminMiddleware, productController.deleteProduct);

module.exports = router;
