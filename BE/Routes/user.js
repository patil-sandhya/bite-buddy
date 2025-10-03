const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.get('/', userController.logoutUser);
router.put('/address/:userId', userController.saveAddress);
router.get('/address/:userId', userController.getUserAddress);

module.exports = router;
