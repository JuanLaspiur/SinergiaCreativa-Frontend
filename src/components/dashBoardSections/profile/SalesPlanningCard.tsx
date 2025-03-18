import {Card} from '../../commons/componentsExports';
import { useState } from 'react';



const SalesPlanningCard: React.FC = () => {
  const [profit, setProfit] = useState<number>(0);

  const handleEditPlanning = () => {
    alert("Editar planificación de ganancias mensual");
  };

  return (
    <Card title="Mi Planificación Mensual" text={''}>
      <div className="mb-3">
        <p>
          <strong>Ganancias Actuales Netas:</strong> ${profit.toFixed(2)}
        </p>
        <p><strong>Ganancia neta de hoy:</strong>458648</p>
        <p><strong>Ganancia neta mensual:</strong>77575</p>
        <p><strong>Ganancia neta mensual:</strong>77575</p>
      </div>
      <button className="btn btn-primary" onClick={handleEditPlanning}>
        Editar Planificación de Ganancias
      </button>
    </Card>
  );
};

export default SalesPlanningCard;
