import React, { useState } from 'react';

interface CurrencyConverterProps {
  exchangeRate: number;
  onClose: () => void;
}

const CurrencyConverterModal: React.FC<CurrencyConverterProps> = ({ exchangeRate, onClose }) => {
  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [conversionType, setConversionType] = useState<'usd-to-ars' | 'ars-to-usd'>('usd-to-ars');

  const handleConvert = () => {
    if (conversionType === 'usd-to-ars') {
      setConvertedAmount(amount * exchangeRate);
    } else {
      setConvertedAmount(amount / exchangeRate);
    }
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="amount">Cantidad:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="conversionType">Tipo de Conversión:</label>
        <select
          id="conversionType"
          value={conversionType}
          onChange={(e) => setConversionType(e.target.value as 'usd-to-ars' | 'ars-to-usd')}
          className="form-control"
        >
          <option value="usd-to-ars">USD a ARS</option>
          <option value="ars-to-usd">ARS a USD</option>
        </select>
      </div>

      <button className="btn btn-primary mt-3" onClick={handleConvert}>
        Convertir
      </button>

      {convertedAmount > 0 && (
        <div className="mt-3">
          <p><strong>Resultado:</strong></p>
          <p>
            {conversionType === 'usd-to-ars'
              ? `${amount} USD = ${convertedAmount.toFixed(2)} ARS`
              : `${amount} ARS = ${convertedAmount.toFixed(2)} USD`}
          </p>
        </div>
      )}

      <button className="btn btn-secondary mt-3 mx-2" onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
};

export default CurrencyConverterModal;
