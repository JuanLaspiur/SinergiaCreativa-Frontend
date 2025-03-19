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


type UpdatePasswordResponse = { 
  data:{
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };}
};

export const updatePassword = async (
  userId: string, 
  currentPassword: string, 
  newPassword: string
): Promise<UpdatePasswordResponse> => {
  try {
    const response = await $api.put(`/users/${userId}/change-password`, { 
      currentPassword, 
      newPassword 
    }) as UpdatePasswordResponse;
    console.log('Respuesta del servidor '+JSON.stringify(response))
    return response;
  } catch (error) {
    console.error('Failed to update password:', error);
    throw error;  
  }
};

type DeleteUserResponse = {
  message: string;
  error: number;
};

export const deleteUser = async (userId: string): Promise<DeleteUserResponse> => {
  try {
    const response = await $api.delete(`/users/${userId}`) as DeleteUserResponse;

    return response;
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;  
  }
};
