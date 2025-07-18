
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  status: z.number().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  status: z.number().optional(),
});

export const updateInventorySchema = z.object({
  quantity: z.number().int().nonnegative('Quantity must be 0 or more'),
});
