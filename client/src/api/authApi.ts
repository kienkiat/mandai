
import axios from './axios';

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await axios.post('/login', payload);
  return response.data;
};

export const signupUser = async (payload: SignupPayload) => {
  const response = await axios.post('/signup', payload);
  return response.data;
};
