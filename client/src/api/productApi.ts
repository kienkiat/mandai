
import axios from './axios';

export const fetchProducts = async (page = 1, limit = 10) => {
  const response = await axios.get(`/products?page=${page}&limit=${limit}`);
  return response.data;
};

export const fetchProductById = async (id: string) => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};

export const createProductApi = (formData: FormData) =>
  axios.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateProductApi = (id: number, formData: FormData) =>
  axios.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteProductApi = (id: number) =>
  axios.delete(`/products/${id}`);

export const updateInventoryApi = async (productId: number, quantity: number) => {
  return axios.put(`/inventory/${productId}`, { quantity });
};