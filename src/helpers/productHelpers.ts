import { IProduct } from "../interfaces/Product";
import { ISale } from "../interfaces/Sale";

export const getTotalSalesByProduct = (productId: string, monthlySales: ISale[]): number => {
  return monthlySales.reduce((count, sale: ISale) => {
    if (sale.product._id === productId) {
      return count + 1; 
    }
    return count;
  }, 0);
};

const getCommissionBase = (product: IProduct, monthlySales: ISale[]): { percentage: number, formatted: string } => {
  const sales = getTotalSalesByProduct(product._id, monthlySales);
  const lastCommission = product.commissions?.[product.commissions.length - 1];

  if (lastCommission && sales > lastCommission.number) {
    return { percentage: lastCommission.percentage, formatted: `${lastCommission.percentage}%` };
  }

  const commission = product.commissions?.find((c) => sales <= c.number);
  if (commission) {
    return { percentage: commission.percentage, formatted: `${commission.percentage}% (hasta ${commission.number} ventas)` };
  }

  return { percentage: 0, formatted: "0%" };
};


export  const getCommission = (product: IProduct, monthlySales: ISale[]): string => {
  const { formatted } = getCommissionBase(product, monthlySales);
  return formatted; 
};


export const getCommissionPercentage = (product: IProduct, monthlySales: ISale[]): number => {
  const { percentage } = getCommissionBase(product, monthlySales);
  return percentage;
};

