import { Request, Response } from 'express';
import { withEm, successResponse, errorResponse, paginatedResponse } from '../utils/helpers';
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

export const getUserOrders = async (req: AuthRequest, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const orm = await getOrm();
        const em = orm.em.fork();

        const [orders, total] = await em.findAndCount(Order, {
            user: req.user!.userId,
        }, {
            populate: ['orderItems.product'],
            limit,
            offset,
            orderBy: { orderDate: 'DESC' },
        });

        paginatedResponse(res, orders, total, page, limit, 'Orders fetched successfully');
    } catch (err) {
        console.error('Get user orders error:', err);
        errorResponse(res, 'Internal server error');
    }
};

export const getUserOrderById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    try {
        const orm = await getOrm();
        const em = orm.em.fork();

        const order = await em.findOne(Order, { id: +id, user: req.user!.userId }, {
            populate: ['orderItems.product'],
        });

        if (!order) {
            return errorResponse(res, 'Order not found', 404);
        }

        successResponse(res, order, undefined, 'Order details fetched');
    } catch (err) {
        console.error('Get user order by ID error:', err);
        errorResponse(res, 'Internal server error');
    }
};

export const getAllOrdersAdmin = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const orm = await getOrm();
        const em = orm.em.fork();

        const [orders, total] = await em.findAndCount(Order, {}, {
            populate: ['user', 'orderItems.product'],
            limit,
            offset,
        });

        paginatedResponse(res, orders, total, page, limit, 'All orders fetched successfully');

    } catch (err) {
        console.error('Get all orders (admin) error:', err);
        errorResponse(res, 'Internal server error');
    }
};
