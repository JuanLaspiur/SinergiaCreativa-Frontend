import Card from '../../commons/Card';
import { ISale } from '../../../interfaces/Sale'; 

interface MonthlyIncomeCardProps {
  monthlySales: ISale[];  
}

const MonthlyIncomeCard = ({ monthlySales }: MonthlyIncomeCardProps) => {
  const monthlyIncome = monthlySales.reduce((acc, sale) => acc + sale.profit, 0);

  return (
    <Card title="Ganancia Mensual">
      <div className="text-center">
        <h2 className="display-4">$$ {monthlyIncome.toFixed(2)}</h2>
        <p className="lead">Ganancia total de ventas este mes</p>
      </div>
    </Card>
  );
};

export default MonthlyIncomeCard;
