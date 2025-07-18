import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { MikroORM } from '@mikro-orm/core';
import ormConfig from '../mikro-orm.config';
import { successResponse, errorResponse } from '../utils/helpers';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

//reuse a single MikroORM instance
let orm: MikroORM | null = null;
const getOrm = async () => {
    if (!orm) {
        orm = await MikroORM.init(ormConfig);
    }
    return orm;
};

export const signUp = async (req: any, res: any) => {
    try {
        const { username, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const orm = await getOrm();
        const em = orm.em.fork(); // scoped EntityManager

        const user = em.create(User, {
            username,
            email,
            password: hashedPassword,
            role: role || 'customer'
        });

        await em.persistAndFlush(user);

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        const { password: _, ...userData } = user;

        return successResponse(res, { user: userData, token }, undefined, 'User created successfully');

    } catch (error) {
        console.error('Sign up error:', error);
        errorResponse(res, 'Internal server error');
    }
};

export const login = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;

        const orm = await getOrm();
        const em = orm.em.fork();

        const user = await em.findOne(User, { email });

        if (!user) {
            return errorResponse(res, 'Invalid credentials', 400);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return errorResponse(res, 'Invalid credentials', 400);
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        const { password: _, ...userData } = user;

        return successResponse(res, { user: userData, token }, undefined, 'Login successful');
    } catch (error) {
        console.error('Login error:', error);
        return errorResponse(res, 'Internal server error', 500);
    }
};
