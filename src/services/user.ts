import { $api } from './api'; 

type UpdateExpectedMonthlyIncomeResponse = {data:{
  message: string;
  updatedUser: {
    _id: string;
    name: string;
    email: string;
    expectedMonthlyIncome: number;  
    createdAt: string;
    updatedAt: string;
    __v: number;
  };}
};

export const updateExpectedMonthlyIncome = async (userId: string, expectedMonthlyIncome: number): Promise<UpdateExpectedMonthlyIncomeResponse> => {
  try {
    const response = await $api.put(`/users/expected-monthly-income`, { 
      userId, 
      expectedMonthlyIncome 
    }) as UpdateExpectedMonthlyIncomeResponse;
    const updatedUser = response.data.updatedUser;
    

    const updateEvent = new CustomEvent('updateExpectedMonthlyIncome', {
      detail: updatedUser,
    });
    window.dispatchEvent(updateEvent);
    return response;
  } catch (error) {
    console.error('Failed to update expected monthly income:', error);
    throw error;  
  }
};
