export interface ISale {
    product: string; 
    userId: string;   
    total: number;   
    date: string;    
  }
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T[];
  }