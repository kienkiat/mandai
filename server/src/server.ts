import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { getOrm } from './orm';

import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoute';
import cors from 'cors';
import path from 'path';


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

const startServer = async () => {
  try {
    await getOrm(); //init db
    app.listen(3000, () => {
      console.log('Backend running on http://localhost:3000');
    });
  } catch (error) {
    console.error('Error initializing MikroORM:', error);
  }
};

startServer();
