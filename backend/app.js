import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user.routes.js';
import cartRoutes from './routes/cart.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/carts', cartRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

export default app;
