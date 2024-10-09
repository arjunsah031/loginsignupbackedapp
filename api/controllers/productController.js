const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Create the product in the database
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price } = req.body;

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { name, description, price },
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Delete the product
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};
