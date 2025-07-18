// src/utils/helpers.ts

import { Response } from 'express';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/core';

/**
 * Helper to create a forked EntityManager instance
 */
export const withEm = async (fn: (em: EntityManager) => Promise<void>) => {
  const orm = await MikroORM.init();
  const em = orm.em.fork();
  return fn(em);
};

/**
 * Helper to send a success response
 */
export const successResponse = (res: Response, data: any, status: number = 200) => {
  return res.status(status).json({
    status: 'success',
    data,
  });
};

/**
 * Helper to send an error response
 */
export const errorResponse = (res: Response, message: string, status: number = 500) => {
  return res.status(status).json({
    status: 'error',
    message,
  });
};

/**
 * Helper to send a response with paginated results
 */
export const paginatedResponse = (res: Response, data: any, total: number, page: number, limit: number) => {
  return res.status(200).json({
    status: 'success',
    data,
    pagination: {
      total,
      page,
      limit,
    },
  });
};
