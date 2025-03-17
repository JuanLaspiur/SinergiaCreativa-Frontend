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

export const getCommission = (product: IProduct, monthlySales: ISale[]): string => {
  const sales = getTotalSalesByProduct(product._id, monthlySales);
  const lastCommission = product.commissions?.[product.commissions.length - 1];

  if (lastCommission && sales > lastCommission.number) {
    return `${lastCommission.percentage}%`;
  }

  const commission = product.commissions?.find((c) => sales <= c.number);
  if (commission) {
    return `${commission.percentage}% (hasta ${commission.number} ventas)`;
  }

  return "0%";
};
