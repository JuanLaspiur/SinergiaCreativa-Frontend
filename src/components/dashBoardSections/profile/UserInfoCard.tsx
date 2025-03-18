import { useEffect, useState } from 'react'; 
import Card from '../../commons/Card'; 
import { ISale } from '../../../interfaces/Sale'; 
import { FaUserCircle } from 'react-icons/fa'; // Importando el ícono de react-icons

interface UserInfoCardProps {
  userName?: string;
  dailySales: ISale[];
  monthlySales: ISale[];
  userSales: ISale[];
}

const UserInfoCard = ({ userName, dailySales, monthlySales, userSales }: UserInfoCardProps) => {
  const [userData, setUserData] = useState<{ name: string; netIncome: number; netMonthlyIncome: number; netIncomeUserSales: number } | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>('');

  const calculateUserData = () => {
    const netIncome = dailySales.reduce((acc, sale) => acc + sale.profit, 0);
    const netMonthlyIncome = monthlySales.reduce((acc, sale) => acc + sale.profit, 0);
    const netIncomeUserSales = userSales.reduce((acc, sale) => acc + sale.profit, 0);
    setUserData({
      name: userName ? userName : '',
      netIncome,
      netMonthlyIncome,
      netIncomeUserSales
    });

    const month = new Date().toLocaleString('default', { month: 'long' });
    setCurrentMonth(month.charAt(0).toUpperCase() + month.slice(1));
  };

  useEffect(() => {
    calculateUserData();
  }, [dailySales, userName, monthlySales]);

  return (
    <Card 
      title="Información del Usuario" 
      text={``} 
      icon={<FaUserCircle />}
    >
      <div className="mt-1">
        {userData ? (
          <>
            <p><strong>Mes:</strong> {currentMonth}</p>
            <p><strong>Ganancia neta de hoy:</strong> $$ {userData.netIncome.toFixed(2)}</p>
            <p><strong>Ganancia neta mensual:</strong> $$ {userData.netMonthlyIncome.toFixed(2)}</p>
            <p><strong>Ganancia neta total:</strong> $$ {userData.netIncomeUserSales.toFixed(2)}</p>
          </>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}
      </div>
    </Card>
  );
};

export default UserInfoCard;
