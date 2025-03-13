import { $api } from './api';
import { ISale } from '../interfaces/Sale';

export const createSale = async (saleData: ISale) => {
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

