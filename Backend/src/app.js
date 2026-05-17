const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

const app = express();

// Standard middleware
app.use(cors());
app.use(express.json());

// Base API health route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Veilux API is running and healthy' });
});

// App API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Fallback middlewares for error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
