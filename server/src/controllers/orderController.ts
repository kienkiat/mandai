import { Request, Response } from 'express';
import { withEm, successResponse, errorResponse } from '../utils/helpers';
import { AuthRequest } from '../middleware/authMiddleware';
import { CartItem } from '../models/CartItem';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { getOrm } from '../orm';

export const createOrderFromCart = async (req: AuthRequest, res: Response) => {
    try {
        const orm = await getOrm();
        const em = orm.em.fork();
        const cartItems = await em.find(CartItem, { user: req.user!.userId }, { populate: ['product'] });

        if (cartItems.length === 0) {
            return errorResponse(res, 'Cart is empty', 400);
        }

        let totalPrice = 0;
        const order = em.create(Order, {
            user: req.user!.userId,
            totalPrice: 0,
            status: 1,
            orderDate: new Date(),
        });

        await em.persist(order);

        for (const item of cartItems) {
            const orderItem = em.create(OrderItem, {
                order,
                product: item.product,
                quantity: item.quantity,
                price: item.product.price,
            });
            totalPrice += item.quantity * item.product.price;
            await em.persist(orderItem);
        }

        order.totalPrice = totalPrice;
        await em.flush();

        // Clear cart
        await em.nativeDelete(CartItem, { user: req.user!.userId });

        successResponse(res, { message: 'Order created successfully', orderId: order.id });
    } catch (err) {
        console.error('Create order error:', err);
        errorResponse(res, 'Internal server error');
    }
};
