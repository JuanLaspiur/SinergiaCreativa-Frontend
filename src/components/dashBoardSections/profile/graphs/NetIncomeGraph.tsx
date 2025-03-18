import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NetIncomeGraph = () => {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ganancia Neta',
        data: [1200, 1500, 1400, 1800, 2100, 2200], 
        borderColor: 'rgba(40, 167, 69, 1)',
        backgroundColor: 'rgba(40, 167, 69, 0.2)', 
        fill: true, 
        tension: 0.4, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ganancia Neta Mensual',
      },
    },
    scales: {
      y: {
        beginAtZero: true, 
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default NetIncomeGraph;
