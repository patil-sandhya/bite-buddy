const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
      quantity: Number
    }
  ],
  totalAmount: Number,
  status: { type: String, default: 'placed' }, // or 'delivered', 'cancelled'
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
