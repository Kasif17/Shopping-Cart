import Cart from '../models/Cart.model.js';

export const addToCart = async (req, res) => {
  const { product } = req.body;

  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      userId: req.user._id,
      items: []
    });
  }

  const existingItem = cart.items.find(
    item => item.productId === product.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  await cart.save();

  res.json(cart);
};

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    return res.json({
      userId: req.user._id,
      items: []
    });
  }

  res.json(cart);
};

export const clearCart = async (req, res) => {
  await Cart.deleteOne({ userId: req.user._id });
  res.json({ message: 'Cart cleared' });
};
