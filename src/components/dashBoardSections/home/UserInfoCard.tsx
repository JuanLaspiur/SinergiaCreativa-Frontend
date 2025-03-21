import { useEffect, useState } from 'react'; 
import Card from '../../commons/Card'; 
import { ISale } from '../../../interfaces/Sale'; 
import { FaUserCircle } from 'react-icons/fa'; 

interface UserData {
  name: string;
  netIncome: number;
  netMonthlyIncome: number;
}

interface UserInfoCardProps {
  userName?: string;
  dailySales: ISale[];
  monthlySales: ISale[];
}

const UserInfoCard = ({ userName, dailySales, monthlySales }: UserInfoCardProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>('');

  const fetchUserData = async () => {
    const netIncome = dailySales.reduce((acc, sale) => acc + sale.profit, 0);
    const netMonthlyIncome = monthlySales.reduce((acc, sale) => acc + sale.profit, 0);
    setUserData({
      name: userName ? userName : 'Usuario desconocido',
      netIncome,
      netMonthlyIncome, 
    });

    const month = new Date().toLocaleString('default', { month: 'long' });
    setCurrentMonth(month.charAt(0).toUpperCase() + month.slice(1));
  };

  useEffect(() => {
    fetchUserData();
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
            <p className="card-text text-primary font-weight-bold">{`Bienvenido, ${userData.name}`}</p>
            <p><strong>Mes:</strong> {currentMonth}</p>
            <p><strong>Ganancia neta de hoy:</strong> $$ {userData.netIncome.toFixed(2)}</p>
            <p><strong>Ganancia neta mensual:</strong> $$ {userData.netMonthlyIncome.toFixed(2)}</p>
          </>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}
      </div>
    </Card>
  );
};

export default UserInfoCard;
