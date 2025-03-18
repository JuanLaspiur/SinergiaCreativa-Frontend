import { useState, useEffect } from 'react';
import Card from '../../commons/Card';
import { getFormattedTime, getFormattedDate } from '../../../helpers/clockHelpers';

function Clock() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const updateTimeAndDate = () => {
    const now = new Date();
    setTime(getFormattedTime(now));
    setDate(getFormattedDate(now));
  };

  useEffect(() => {
    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 60000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <Card title="Reloj">
      <div className="text-center">
        <h1 className="display-1">{time}</h1>
        <p className="lead">{date}</p>
      </div>
    </Card>
  );
}

export default Clock;
