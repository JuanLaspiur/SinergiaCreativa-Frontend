import { Card, Modal } from '../../commons/componentsExports';
import { useState } from 'react';
import { updateExpectedMonthlyIncome } from '../../../services/user';
import Swal from "sweetalert2";  
import { ISale } from '../../../interfaces/Sale';

interface SalesPlanningCardProps {
  userExpected: number | undefined;
  userId: string | undefined;
  monthlySales: ISale[];
}

const SalesPlanningCard = ({ userExpected, userId, monthlySales }: SalesPlanningCardProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newExpectedIncome, setNewExpectedIncome] = useState<number | string>(''); 
  const netMonthlyIncome = monthlySales.reduce((acc, sale) => acc + sale.profit, 0);

  const missingAmount = userExpected && netMonthlyIncome < userExpected ? userExpected - netMonthlyIncome : 0;

  const handleEditPlanning = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleUpdateExpectedIncome = async () => {
    if (!userId) return;

    try {
      const income = Number(newExpectedIncome);

      if (isNaN(income) || income <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor ingresa una cantidad válida',
        });
        return;
      }

      const roundedIncome = income.toFixed(2);

      await updateExpectedMonthlyIncome(userId, parseFloat(roundedIncome));

      Swal.fire({
        icon: 'success',
        title: 'Actualización exitosa',
        text: 'Expectativa mensual actualizada con éxito',
      });

      handleCloseModal(); 
    } catch (error) {
      console.error("Error al actualizar la expectativa mensual", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar la expectativa mensual.',
      });
    }
  };

  return (
    <Card title="Mi Planificación Mensual" text={''}>
      <div className="mb-3">
        <p><strong>Expectativa Mensual:</strong> $$ {userExpected ? userExpected.toFixed(2) : '0.00'}</p>
        <p><strong>Ganancia mensual actual:</strong> $$ {netMonthlyIncome ? netMonthlyIncome.toFixed(2) : '0.00'}</p>
        {userExpected ? (
          <p><strong>Falta para objetivo mensual:</strong> $$ {missingAmount.toFixed(2)}</p>
        ) : ''}
      </div>
      <button className="btn btn-primary animate__animated animate__pulse"  onClick={handleEditPlanning}>
        Editar Expectativa Mensual
      </button>
      
      {showModal && (
        <Modal title='Cambiar Expectativa de Ganancias' onClose={handleCloseModal}>
          <div>
            <label>Nuevo valor de Expectativa de Ganancia Mensual:</label>
            <input 
              type="number" 
              value={newExpectedIncome} 
              onChange={(e) => setNewExpectedIncome(e.target.value)} 
              placeholder="Ingrese nuevo valor" 
              className="form-control"
            />
          </div>
          <div className="mt-3">
            <button className="btn btn-primary" onClick={handleUpdateExpectedIncome}>
              Actualizar Expectativa
            </button>
            <button className="btn btn-secondary mx-2" onClick={handleCloseModal}>
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </Card>
  );
};

export default SalesPlanningCard;
