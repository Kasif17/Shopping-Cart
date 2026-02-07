import { Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import {
  placeOrder,
  getUserOrders
} from '../controllers/order.controller.js';

const router = Router();

router.post('/', auth, placeOrder);
router.get('/', auth, getUserOrders);

export default router;
