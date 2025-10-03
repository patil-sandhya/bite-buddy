const Order = require('../Models/orderModel');
const CartItem = require('../Models/cartModel');

exports.getOrders = async (req, res) => {
  try {
   const orders = await Order.find({ userId: req.params.userId })
  .select('_id totalAmount items createdAt')
  .populate('items.foodItem', 'name imageUrl price');

    const formattedOrders = orders.map(order => ({
    _id: order._id,
    totalAmount: order.totalAmount,
    createdAt: order.createdAt,
    items: order.items.map(item => ({
        qty: item.quantity,
        name: item.foodItem.name,
        price: item.foodItem.price,
        imageUrl: item.foodItem.imageUrl,
        foodid: item.foodItem._id
    }))
    }));
    res.json(formattedOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.placeOrder = async (req, res) => {
  const { userId, totalAmount } = req.body;

  try {
    const cartItems = await CartItem.find({ userId }).populate('foodItem');
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cartItems.map(item => ({
      foodItem: item.foodItem._id,
      quantity: item.quantity
    }));

    // const totalAmount = cartItems.reduce(
    //   (sum, item) => sum + item.foodItem.price * item.quantity,
    //   0
    // );

    const newOrder = await Order.create({
      userId,
      items: orderItems,
      totalAmount
    });

    await CartItem.deleteMany({ userId });

    res.status(200).json({ message: 'Order placed', order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
