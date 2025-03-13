import { useEffect, useState } from 'react'; 
import Card from './commons/Card';

interface UserData {
  name: string;
  netIncome: number;
  netMonthlyIncome: number; 
}

interface UserInfoCardProps {
  userName?: string;
}

const UserInfoCard = ({ userName }: UserInfoCardProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>('');

  const fetchUserData = async () => {
    setUserData({
      name: userName ? userName : '',
      netIncome: 5000, 
      netMonthlyIncome: 150000,
    });

    const month = new Date().toLocaleString('default', { month: 'long' });
    setCurrentMonth(month.charAt(0).toUpperCase() + month.slice(1)); 
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Card title="Información del Usuario" text={`Bienvenido, ${userData?.name}`}>
      <div className="mt-1">
        {userData ? (
          <>
            <p><strong>Mes:</strong> {currentMonth}</p>
            <p><strong>Ganancia neta de hoy:</strong> ${userData.netIncome?.toFixed(2)}</p>
            <p><strong>Ganancia neta mensual:</strong> ${userData.netMonthlyIncome?.toFixed(2)}</p> 
          </>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}
      </div>
    </Card>
  );
};

export default UserInfoCard;
