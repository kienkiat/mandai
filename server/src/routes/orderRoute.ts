
import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { createOrderFromCart } from '../controllers/orderController';

const router = express.Router();

router.post('/orders', authenticate, createOrderFromCart);

export default router;
