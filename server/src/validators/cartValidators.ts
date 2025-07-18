import { z } from 'zod';

export const updateCartItemSchema = z.object({
  productId: z.number(),
  type: z.enum(['add', 'minus', 'remove']),
  quantity: z.number().min(1).optional(),
});
