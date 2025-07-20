
import axios from './axios';

export const fetchProducts = async (page = 1, limit = 10) => {
  const response = await axios.get(`/products?page=${page}&limit=${limit}`);
  return response.data;
};

export const fetchProductById = async (id: string) => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};