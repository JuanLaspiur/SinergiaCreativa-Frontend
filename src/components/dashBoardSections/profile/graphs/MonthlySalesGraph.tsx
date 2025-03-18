import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface MonthlySalesGraphProps {
  userExpected?: number; // Puede ser un número o undefined
}

const MonthlySalesGraph = ({ userExpected }: MonthlySalesGraphProps) => {
  const data = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Ventas',
        data: [0, 1400, 1300, 1600],
        borderColor: 'rgba(0, 123, 255, 0.6)', 
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Expectativa Mensual', 
        data: [userExpected, userExpected, userExpected, userExpected], 
        borderColor: 'rgba(255, 193, 7, 0.8)', 
        backgroundColor: 'rgba(255, 193, 7, 0.2)', 
        borderDash: [5, 5],
        fill: false, 
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
        text: 'Ventas Semanales con Expectativa',
      },
    },
  };



  return <Line data={data} options={options} />;
};

export default MonthlySalesGraph;
