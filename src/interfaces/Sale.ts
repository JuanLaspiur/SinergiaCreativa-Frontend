import { IProduct } from "./Product";

export interface ISale {
    product: IProduct; 
    userId: string;   
    total: number;   
    date: string;    
  }
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T[];
  }

  export interface SalesContextType {
    sales: ISale[];
    dailySales: ISale[];
    monthlySales: ISale[];
    userSales: ISale[];
    error: string | null;
    addSale: (saleData: ISale) => Promise<void>;
    fetchAllSales: () => Promise<void>;
    fetchDailySales: () => Promise<void>;
    fetchMonthlySales: () => Promise<void>;
    fetchUserSales: () => Promise<void>;
  }