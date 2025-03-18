import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesTableGraph = () => {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ventas 2025',
        data: [300, 500, 400, 700, 600, 800],
        backgroundColor: 'rgba(13, 110, 253, 0.6)', 
      },
      {
        label: 'Ventas 2024',
        data: [200, 400, 350, 650, 550, 750],
        backgroundColor: 'rgba(253, 126, 20, 0.6)', 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'  as const,
      },
      title: {
        display: true,
        text: 'Ventas Mensuales',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SalesTableGraph;


