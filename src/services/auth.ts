import { $api } from './api'; 

type LoginResponse = {
  data:{
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  token: string;
}};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await $api.post('/users/login', { email, password }) as LoginResponse;
    return response as LoginResponse;  
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

type RegisterResponse = {
  name: string;
  email: string;
  password: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type RegisterErrorResponse = {
  message: string;
  error: number;
};

export const register = async (name: string, email: string, password: string): Promise<RegisterResponse | RegisterErrorResponse> => {
  try {
    const response = await $api.post('/users', { name, email, password }) as RegisterResponse;
    
    if ('error' in response) {
      return response;
    }
    return response as RegisterResponse;

  } catch (error) {
    console.error('Registration failed:', error);
    throw error; 
  }
};