import Product from '../models/Product.model.js';

export const addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
