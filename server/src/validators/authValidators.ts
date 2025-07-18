import { z } from 'zod';

export const signUpSchema = z.object({
    username: z.string().min(3, 'Username must be at least 4 characters'),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['admin', 'customer']).optional(),
});

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, 'Password is required'),
});
