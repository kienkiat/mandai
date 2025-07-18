// src/controllers/productController.ts

import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { getOrm } from '../orm';
import { successResponse, errorResponse } from '../utils/helpers';
import { Inventory } from '../models/Inventory';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const orm = await getOrm();
    const em = orm.em.fork(); // Scoped entity manager
    
    const products = await em.find(Product, {});
    successResponse(res, products, undefined, 'Products fetched successfully');
  } catch (error) {
    console.error('Get products error:', error);
    errorResponse(res, 'Internal server error');
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const orm = await getOrm();
    const em = orm.em.fork(); // Scoped entity manager
    
    const product = await em.findOne(Product, { id: +id });
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }
    successResponse(res, product, undefined, 'Product fetched successfully');
  } catch (error) {
    console.error('Get product by ID error:', error);
    errorResponse(res, 'Internal server error');
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, status } = req.body;

  try {
    const orm = await getOrm();
    const em = orm.em.fork(); // Scoped entity manager
    
    const newProduct = em.create(Product, {
      name,
      description,
      price,
      status,
    });

    await em.persistAndFlush(newProduct);
    successResponse(res, newProduct, undefined, 'Product created successfully');
  } catch (error) {
    console.error('Create product error:', error);
    errorResponse(res, 'Internal server error');
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, status } = req.body;

  try {
    const orm = await getOrm();
    const em = orm.em.fork();

    const product = await em.findOne(Product, { id: +id });
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.status = status || product.status;

    await em.persistAndFlush(product);
    successResponse(res, product, undefined, 'Product updated successfully');
  } catch (error) {
    console.error('Update product error:', error);
    errorResponse(res, 'Internal server error');
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const orm = await getOrm();
    const em = orm.em.fork();
    
    const product = await em.findOne(Product, { id: +id });
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }

    await em.removeAndFlush(product);
    successResponse(res, { message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    errorResponse(res, 'Internal server error');
  }
};

export const getInventory = async (req: Request, res: Response) => {
  try {
    const orm = await getOrm();
    const em = orm.em.fork();

    const inventory = await em.find(Inventory, {}, { populate: ['product'] });
    successResponse(res, inventory), undefined, 'Inventory fetched successfully';
  } catch (error) {
    console.error('Get inventory error:', error);
    errorResponse(res, 'Internal server error');
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const orm = await getOrm();
    const em = orm.em.fork();

    const product = await em.findOne(Product, { id: +productId });
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }

    let inventory = await em.findOne(Inventory, { product });

    if (!inventory) {
      inventory = em.create(Inventory, { product, quantity });
    } else {
      inventory.quantity = quantity;
    }

    await em.persistAndFlush(inventory);
    successResponse(res, inventory, undefined, 'Inventory updated successfully');
  } catch (error) {
    console.error('Update inventory error:', error);
    errorResponse(res, 'Internal server error');
  }
};