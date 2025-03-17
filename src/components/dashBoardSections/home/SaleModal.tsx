import { useState, useMemo, useEffect } from 'react';
import Modal from '../../commons/Modal';
import { useProducts } from '../../../hooks/useProducts';
import useHandleSale from '../../../hooks/useHandleSale'; 

interface SaleModalProps {
  onClick?: () => void;
  show: boolean;
}

function SaleModal({ onClick, show }: SaleModalProps) {
  const { products } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const selectedProduct = useMemo(
    () => products.find((product) => product._id === selectedProductId),
    [selectedProductId, products]
  );

  useEffect(() => {
    if (!show) {
      setSelectedProductId('');
      setQuantity(1);
    }
  }, [show]);

  const { handleSale, loading } = useHandleSale(onClick);

  if (!show) return null;

  return (
    <Modal title="Realizar Venta" onClose={onClick}>
      <div className="mb-3">
        <label htmlFor="productName" className="form-label">Producto</label>
        <select
          id="productName"
          className="form-select w-100"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          style={{ fontSize: '0.875rem' }}
          aria-label="Seleccionar producto"
        >
          <option value="">Seleccione un producto</option>
          {products.map(({ _id, title }) => (
            <option key={_id} value={_id}>{title}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">Cantidad</label>
        <input
          type="number"
          id="quantity"
          className="form-control w-100"
          placeholder="Cantidad"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(Number(e.target.value), 1))}
          readOnly
          aria-label="Cantidad de producto"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Precio Unitario</label>
        <input
          type="text"
          id="price"
          className="form-control w-100"
          placeholder="Precio"
          value={selectedProduct?.price ?? 0}
          readOnly
          aria-label="Precio unitario"
        />
      </div>
      <button
        className="btn btn-primary w-100"
        onClick={() => handleSale(selectedProductId, selectedProduct?.price ?? 0, selectedProduct?.title, quantity)}
        aria-label="Realizar venta"
        disabled={loading} 
      >
        {loading ? 'Procesando...' : 'Realizar Venta'}
      </button>
    </Modal>
  );
}

export default SaleModal;
