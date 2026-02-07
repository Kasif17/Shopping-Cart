import { Router } from 'express';
import { addProduct, getProducts } from '../controllers/product.controller.js';

const router = Router();

router.post('/', addProduct);
router.get('/', getProducts);

export default router;
