export interface IUser {
    _id: string;
    name: string;
    email: string;
    expectedMonthlyIncome?:number;
    createdAt: string;
    updatedAt: string;
  }