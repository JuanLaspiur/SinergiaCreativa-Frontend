import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NetIncomeGraph = () => {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ganancia Neta',
        data: [1200, 1500, 1400, 1800, 2100, 2200], // Datos de ganancias netas
        borderColor: 'rgba(40, 167, 69, 1)', // Verde Bootstrap
        backgroundColor: 'rgba(40, 167, 69, 0.2)', // Verde semitransparente
        fill: true, // Llenar el área debajo de la línea
        tension: 0.4, // Curvatura de la línea
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
        text: 'Ganancia Neta Mensual',
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Asegurarse de que el eje Y empiece desde cero
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

export default NetIncomeGraph;
