// src/routes/productRoutes.ts

import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getInventory,
    updateInventory,
} from '../controllers/productController';

import { validate } from '../middleware/validate';
import {
    createProductSchema,
    updateProductSchema,
    updateInventorySchema,
} from '../validators/productValidators';

const router = express.Router();

// Public routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

// Admin-only routes with validation
router.post('/products', authenticate, authorizeAdmin, validate(createProductSchema), createProduct);
router.put('/products/:id', authenticate, authorizeAdmin, validate(updateProductSchema), updateProduct);
router.delete('/products/:id', authenticate, authorizeAdmin, deleteProduct);

router.get('/inventory', authenticate, authorizeAdmin, getInventory);
router.put('/inventory/:productId', authenticate, authorizeAdmin, validate(updateInventorySchema), updateInventory);

export default router;
