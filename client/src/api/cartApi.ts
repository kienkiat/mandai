
import axios from './axios';


export const addToCart = async (productId: number, quantity = 1, type: 'add' | 'minus' | 'remove' = 'add') => {
  const res = await axios.post('/cart', { productId, quantity, type });
  return res.data;
};

export const getCartItems = async () => {
  return await axios.get('/cart');
};
export const getCartSummary = () => {
  return axios.get('/cart/summary');
};

export const placeOrder = async () => {
  return await axios.post('/orders');
};

export const clearCart = async () => {
  return await axios.delete('/cart');
};