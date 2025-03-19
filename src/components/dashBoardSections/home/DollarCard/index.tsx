import React, { useState } from 'react';
import Card from '../../../commons/Card'; 
import { FaSyncAlt } from 'react-icons/fa'; 
import useExchangeRate from '../../../../hooks/useExchangeRate'; 
import Modal from '../../../commons/Modal';
import CurrencyConverterModal from './CurrencyConverterModal';

const DollarCard: React.FC = () => {
  const { exchangeRate, loading, error, updatedAt, fetchExchangeRate } = useExchangeRate();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleRefresh = () => {
    fetchExchangeRate();
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
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
          <button className="btn btn-outline-secondary" onClick={() => setShowModal(true)}>
            Convertir
          </button>
        </div>
      </div>
    </Card>
    {showModal && (
        <Modal onClose={handleModalClose} title="Convertir Moneda">
          <CurrencyConverterModal exchangeRate={exchangeRate!} onClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
};

export default DollarCard;
