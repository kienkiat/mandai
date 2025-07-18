import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { getOrm } from './orm';

import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', authRoutes);

const startServer = async () => {
  try {
    await getOrm(); // Initialize DB connection once before starting the server
    app.listen(3000, () => {
      console.log('Backend running on http://localhost:3000');
    });
  } catch (error) {
    console.error('Error initializing MikroORM:', error);
  }
};

startServer();
