import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { updateCartItem, getCart, clearCart, getCartSummary } from '../controllers/cartController';
import { validate } from '../middleware/validate';
import { updateCartItemSchema } from '../validators/cartValidators';

const router = express.Router();

router.post('/cart', authenticate, validate(updateCartItemSchema), updateCartItem);
router.get('/cart', authenticate, getCart);

router.delete('/cart', authenticate, clearCart);
router.get('/cart/summary', authenticate, getCartSummary);
export default router;
