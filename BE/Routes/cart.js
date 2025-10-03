const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');

router.post('/add-to-cart', cartController.addToCart);
router.get('/:userId', cartController.getCart);
router.delete('/', cartController.removeFromCart);
router.put('/quantity', cartController.updateCartQuantity);

module.exports = router;
