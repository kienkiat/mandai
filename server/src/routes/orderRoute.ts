
import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware';
import { createOrderFromCart, getAllOrdersAdmin, getUserOrderById, getUserOrders } from '../controllers/orderController';

const router = express.Router();

router.post('/orders', authenticate, createOrderFromCart);
router.get('/orders', authenticate, getUserOrders);
router.get('/orders/:id', authenticate, getUserOrderById);

router.get('/admin/orders', authenticate, authorizeAdmin, getAllOrdersAdmin);

export default router;
