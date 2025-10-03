const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');

router.post('/', orderController.placeOrder);
router.get('/:userId', orderController.getOrders);


module.exports = router;
