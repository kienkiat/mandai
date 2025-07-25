import { Request, Response } from 'express';
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';
import { withEm, successResponse, errorResponse } from '../utils/helpers';
import { AuthRequest } from '../middleware/authMiddleware';
import { getOrm } from '../orm';

export const updateCartItem = async (req: AuthRequest, res: Response) => {
    const { productId, type, quantity } = req.body;

    try {
        const orm = await getOrm();
        const em = orm.em.fork();

        const product = await em.findOne(Product, { id: +productId });
        if (!product) {
            return errorResponse(res, 'Product not found', 404);
        }

        let cartItem = await em.findOne(CartItem, {
            user: req.user!.userId,
            product,
        });

        if (type === 'add') {
            if (cartItem) {
                cartItem.quantity += quantity ?? 1;
            } else {
                cartItem = em.create(CartItem, {
                    user: req.user!.userId,
                    product,
                    quantity: quantity ?? 1,
                });
            }
        } else if (type === 'minus') {
            if (!cartItem) {
                return errorResponse(res, 'Cart item not found to decrease', 404);
            }

            cartItem.quantity -= quantity ?? 1;

            if (cartItem.quantity <= 0) {
                await em.removeAndFlush(cartItem);
                return successResponse(res, { message: 'Item removed from cart' });
            }
        } else if (type === 'remove') {
            if (!cartItem) {
                return errorResponse(res, 'Cart item not found to remove', 404);
            }

            await em.removeAndFlush(cartItem);
            return successResponse(res, { message: 'Item removed from cart' });
        }
        if (!cartItem) {
            return errorResponse(res, 'Cart item not found', 404);
        }
        await em.persistAndFlush(cartItem);
        successResponse(res, cartItem, undefined, 'Cart item updated successfully');
    } catch (err) {
        console.error('Update cart item error:', err);
        errorResponse(res, 'Internal server error');
    }
};

export const getCart = async (req: AuthRequest, res: Response) => {
    try {
        const orm = await getOrm();
        const em = orm.em.fork();
        const items = await em.find(CartItem, { user: req.user!.userId }, { populate: ['product'] });
        successResponse(res, items, undefined, 'Cart items fetched successfully');
    } catch (err) {
        console.error('Get cart error:', err);
        errorResponse(res, 'Internal server error');
    }
};
export const clearCart = async (req: AuthRequest, res: Response) => {
    try {
        const orm = await getOrm();
        const em = orm.em.fork();

        await em.nativeDelete(CartItem, { user: req.user!.userId });

        successResponse(res, null, undefined, 'Cart cleared successfully');
    } catch (err) {
        console.error('Clear cart error:', err);
        errorResponse(res, 'Internal server error');
    }
};

export const getCartSummary = async (req: AuthRequest, res: Response) => {
    try {
        const orm = await getOrm();
        const em = orm.em.fork();

        const items = await em.find(CartItem, { user: req.user!.userId }, { populate: ['product'] });

        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

        successResponse(res, { totalItems, totalPrice }, undefined, 'Cart summary fetched successfully');
    } catch (err) {
        console.error('Get cart summary error:', err);
        errorResponse(res, 'Internal server error');
    }
};


