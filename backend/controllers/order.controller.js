import Order from '../models/Order.model.js';


export const placeOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = await Order.create({
      userId: req.user._id,
      items
    });

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
