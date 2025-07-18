import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getInventory, updateInventory } from '../controllers/productController';

const router = express.Router();

// Public routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

// Admin-only routes
router.post('/products', authenticate, authorizeAdmin, createProduct);
router.put('/products/:id', authenticate, authorizeAdmin, updateProduct);
router.delete('/products/:id', authenticate, authorizeAdmin, deleteProduct);

router.get('/inventory', authenticate, authorizeAdmin, getInventory);
router.put('/inventory/:productId', authenticate, authorizeAdmin, updateInventory);


export default router;
