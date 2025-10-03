const CartItem = require('../Models/cartModel');


exports.addToCart = async (req, res) => {
  const { userId, foodItemId, quantity } = req.body;
  try {
    let existing = await CartItem.findOne({ userId, foodItem: foodItemId });
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
    } else {
      await CartItem.create({ userId, foodItem: foodItemId, quantity });
    }
    res.status(200).json({ message: 'Item added to cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await CartItem.find({ userId })
  .populate('foodItem', 'name imageUrl price'); // select only these fields

  const formattedCart = cart.map(item => ({
  qty: item.quantity,
  price: item.foodItem.price,
  name: item.foodItem.name,
  foodid: item.foodItem._id,
  imageUrl: item.foodItem.imageUrl
}));

res.json(formattedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.removeFromCart = async (req, res) => {
  const { userId, foodItemId } = req.body;

  try {
    const deletedItem = await CartItem.findOneAndDelete({ userId, foodItem: foodItemId });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({ message: "Item removed from cart", deletedItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCartQuantity = async (req, res) => {
  const { userId, foodItemId, quantity } = req.body;

  try {
    const updatedItem = await CartItem.findOneAndUpdate(
      { userId, foodItem: foodItemId },
      { $set: { quantity } },
      { new: true } // return updated document
    );

    if (!updatedItem) {
      return res.status(404).json({ msg: 'Item not found in cart' });
    }

    res.status(200).json({ msg: 'Quantity updated', item: updatedItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
