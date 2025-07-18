
import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { addToCart, getCart } from '../controllers/cartController';

const router = express.Router();

router.post('/cart', authenticate, addToCart);
router.get('/cart', authenticate, getCart);

export default router;
