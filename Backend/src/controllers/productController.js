const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category && category !== 'All') {
      // Handle case-insensitive category match
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product by numerical id
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const numericId = parseInt(req.params.id);
    if (isNaN(numericId)) {
      res.status(400);
      throw new Error('Invalid product ID format');
    }

    const product = await Product.findOne({ id: numericId });

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product (Admin or script use)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
  try {
    const { id, title, price, description, category, image, rating } = req.body;

    const productExists = await Product.findOne({ id });

    if (productExists) {
      res.status(400);
      throw new Error('Product with this ID already exists');
    }

    const product = await Product.create({
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
