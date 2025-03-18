import { $api } from './api'; 

type UpdateExpectedMonthlyIncomeResponse = {
  message: string;
  updatedUser: {
    _id: string;
    name: string;
    email: string;
    expectedMonthlyIncome: number;  
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

export const updateExpectedMonthlyIncome = async (userId: string, expectedMonthlyIncome: number): Promise<UpdateExpectedMonthlyIncomeResponse> => {
  try {
    // que obtenga el token del localstorage "authToken" y lo pase token barer 
    const response = await $api.put(`/users/expected-monthly-income`, { 
      userId, 
      expectedMonthlyIncome 
    }) as UpdateExpectedMonthlyIncomeResponse;
    
    return response;
  } catch (error) {
    console.error('Failed to update expected monthly income:', error);
    throw error;  
  }
};
