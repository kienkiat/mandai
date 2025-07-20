import axios from './axios';

export const getUserOrders = async (page = 1, limit = 10) => {
    const response = await axios.get(`/orders?page=${page}&limit=${limit}`);
    return response.data;
};


export const getUserOrderById = async (orderId: number) => {
    const response = await axios.get(`/orders/${orderId}`);
    return response.data;
};