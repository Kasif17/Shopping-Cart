import Item from '../models/Item.model.js';

export const getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};
