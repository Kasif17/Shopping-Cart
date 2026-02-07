import { Router } from 'express';
import {
  addToCart,
  getCart,
  clearCart
} from '../controllers/cart.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', auth, addToCart);

router.get('/', auth, getCart);

router.delete('/', auth, clearCart);

export default router;
