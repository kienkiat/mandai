import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { MikroORM } from '@mikro-orm/core';
import ormConfig from '../ormconfig';

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

        res.status(201).json({
            message: 'User created successfully',
            data: userData,
            token,
        });
    } catch (error) {
        console.error('Sign up error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;

        const orm = await getOrm();
        const em = orm.em.fork();

        const user = await em.findOne(User, { email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        const { password: _, ...userData } = user;

        res.json({
            message: 'Login successful',
            token,
            data: userData,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
