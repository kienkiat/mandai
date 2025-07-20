
import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';

import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoute';

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

export default app;
