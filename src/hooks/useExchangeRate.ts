import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const useExchangeRate = () => {
  const {user} =useAuth()
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string>('');

  const fetchExchangeRate = async () => {
    setLoading(true);
    setError(null);

    try {
      const keyDolar= import.meta.env.VITE_API_DOLAR_CHANGE ? import.meta.env.VITE_API_DOLAR_CHANGE : '4ff7035d26db2ab8e55ffad2'
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${keyDolar}/latest/USD`);
      const data = await response.json();
      
      if (data.result === 'success') {
        setExchangeRate(data.conversion_rates.ARS); 
        const localDate = new Date().toLocaleString();
        setUpdatedAt(localDate);
      } else if (data.error_type === 'quota-reached') {  
        setError('Has alcanzado el límite de solicitudes para la API. Por favor, espera o actualiza tu plan.');
      } else {
        setError('No se pudo obtener la tasa de cambio.');
      }
    } catch {
      setError('Error al conectar con el servicio de tasas de cambio.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [user?._id]);

  return { exchangeRate, loading, error, updatedAt, fetchExchangeRate };
};

export default useExchangeRate;
