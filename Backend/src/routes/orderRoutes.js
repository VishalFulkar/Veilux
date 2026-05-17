const express = require('express');
const { placeOrder, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, placeOrder).get(protect, getMyOrders);

module.exports = router;
