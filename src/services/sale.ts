import { $api } from './api';
import { ISale, ApiResponse, IdataSale } from '../interfaces/Sale';

export const createSale = async (saleData: IdataSale) => {
  try {
    const response = await $api.post('/sales', saleData); 
    return response.data; 
  } catch (error) {
    console.error('Create sale failed:', error);
    throw error;
  }
}

export const getAllSales = async (): Promise<ISale[]> => {
  try {
    const response = await $api.get('/sales');
    return response.data;  
    
  } catch (error) {
    console.error('Get All sales failed:', error);
    throw error;
  }
};

export const getDailySales = async (userId: string): Promise<ApiResponse<ISale>> => {
  try {
    const response = await $api.get(`/sales/daily/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting daily sales:', error);
    throw error;
  }
};

export const getMonthlySales = async (userId: string): Promise<ApiResponse<ISale>> => {
  try {
    const response = await $api.get(`/sales/monthly/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting monthly sales:', error);
    throw error;
  }
};

export const getSalesByUserId = async (userId: string): Promise<ApiResponse<ISale>> => {
  try {
    const response = await $api.get(`/sales/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting sales by user ID:', error);
    throw error;
  }
};
