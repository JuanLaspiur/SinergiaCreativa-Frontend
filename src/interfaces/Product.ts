
export interface IProduct {
  _id: string;
  title: string;
  commissions?: ICommission[];
  price: number;
  stock: number;
  image: string;
}
export interface ICommission {
  _id: string;
  number: number;
  percentage: number;
  __v: number;
}
