const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  imageUrl: String
}, { timestamps: true });



module.exports = mongoose.model('FoodItem', FoodItemSchema);
