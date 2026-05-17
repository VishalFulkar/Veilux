const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const placeOrder = async (req, res, next) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      res.status(400);
      throw new Error('No order items provided');
    }

    const order = new Order({
      user: req.user._id,
      userEmail: req.user.email,
      items,
      total,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
};
