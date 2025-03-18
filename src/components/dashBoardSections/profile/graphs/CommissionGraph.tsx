import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CommissionGraph = () => {
  const data = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Vendedor A',
        data: [500, 600, 550, 700],
        backgroundColor: 'rgba(54, 162, 235, 0.6)', 
      },
      {
        label: 'Vendedor B',
        data: [700, 800, 750, 900],
        backgroundColor: 'rgba(255, 99, 132, 0.6)', 
      },
      {
        label: 'Vendedor C',
        data: [450, 550, 600, 650],
        backgroundColor: 'rgba(75, 192, 192, 0.6)', 
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
        text: 'Comisiones por Vendedor',
      },
    },
    scales: {
      y: {
        beginAtZero: true, 
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default CommissionGraph;
