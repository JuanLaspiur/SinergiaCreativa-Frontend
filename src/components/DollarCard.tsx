import React, { useEffect, useState } from 'react';
import Card from './commons/Card'; // Asegúrate de que la ruta sea correcta
import { FaSyncAlt } from 'react-icons/fa'; // Usaremos un ícono de actualización

const DollarCard: React.FC = () => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string>('');

  // Función para obtener la tasa de cambio
  const fetchExchangeRate = async () => {
    setLoading(true);
    setError(null);

    try {
      // Reemplaza 'YOUR_API_KEY' con tu API Key obtenida
      const response = await fetch('https://v6.exchangerate-api.com/v6/eccdf8dbe7556ae434389f5f/latest/USD');
      const data = await response.json();
      if (data.result === 'success') {
        setExchangeRate(data.conversion_rates.ARS); // Aquí se obtiene el valor en ARS

        // Obtener la hora local para la actualización
        const localDate = new Date().toLocaleString();
        setUpdatedAt(localDate); // Se utiliza la hora local del navegador
      } else {
        setError('No se pudo obtener la tasa de cambio.');
      }
    } catch (err) {
      setError('Error al conectar con el servicio de tasas de cambio.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const handleRefresh = () => {
    fetchExchangeRate();
  };

  return (
    <Card title="Cotización del Dólar" text={loading ? 'Cargando...' : error || `1 USD = ${exchangeRate} ARS`}>
      <div className="mt-1">
        {!loading && !error && (
          <>
            <p><strong>Última actualización:</strong> {updatedAt}</p>
            <p><strong>Otros valores:</strong></p>
            <ul>
              <li>1 USD = {(exchangeRate! * 0.85).toFixed(2)} EUR</li>
            </ul>
          </>
        )}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-outline-primary" onClick={handleRefresh}>
            <FaSyncAlt className="mr-2" /> Actualizar
          </button>
        </div>
      </div>
    </Card>
  );
};

export default DollarCard;
