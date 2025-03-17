import { useState, useEffect } from 'react';
import Card from '../../commons/Card';

function Clock() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const updateTimeAndDate = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Formatea a dos dígitos
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Formatea a dos dígitos
    setTime(`${hours}:${minutes}`);

    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 
      'Octubre', 'Noviembre', 'Diciembre'
    ];
    const day = now.getDate();
    const dayName = dayNames[now.getDay()];
    const monthName = monthNames[now.getMonth()];
    const year = now.getFullYear();
    
    setDate(`${dayName} ${day} de ${monthName} ${year}`);
  };

  useEffect(() => {
    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 60000); // Actualiza cada minuto

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  return (
    <Card title="Reloj" className="shadow-lg p-4 rounded">
      <div className="text-center">
        <h1 className="display-1">{time}</h1>
        <p className="lead">{date}</p>
      </div>
    </Card>
  );
}

export default Clock;
