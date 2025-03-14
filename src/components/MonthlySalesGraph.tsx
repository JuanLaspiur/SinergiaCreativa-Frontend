import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlySalesGraph = () => {
  const data = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Ventas',
        data: [1200, 1400, 1300, 1600],
        borderColor: 'rgba(0, 123, 255, 0.6)', // Azul Bootstrap
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Expectativa Mensual', // Nueva línea para la expectativa mensual
        data: [1500, 1500, 1500, 1500], // Valores de expectativa mensual
        borderColor: 'rgba(255, 193, 7, 0.8)', // Amarillo
        backgroundColor: 'rgba(255, 193, 7, 0.2)', // Amarillo semitransparente
        borderDash: [5, 5], // Línea punteada
        fill: false, // No llenar el área debajo de la línea
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ventas Semanales con Expectativa',
      },
    },
  };

  useEffect(() => {
    return () => {
      // Limpiar cualquier gráfico creado previamente
      if (window.Chart && window.Chart.instances) {
        window.Chart.instances.forEach(instance => {
          instance.destroy();
        });
      }
    };
  }, []);

  return <Line data={data} options={options} />;
};

export default MonthlySalesGraph;
