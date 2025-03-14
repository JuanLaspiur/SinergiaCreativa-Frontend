import { useState, useMemo } from 'react';
import Modal from './commons/Modal';
import Swal from 'sweetalert2';
import { ISale } from '../interfaces/Sale';
import { createSale } from '../services/sale';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../hooks/useProducts';

interface SaleModalProps {
  onClick?: () => void;
  show: boolean;
}

function SaleModal({ onClick, show }: SaleModalProps) {
  const { user } = useAuth();
  const { products } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const selectedProduct = useMemo(
    () => products.find(product => product._id === selectedProductId),
    [selectedProductId, products]
  );

  if (!show) return null;

  const showMessage = (icon: 'success' | 'error', title: string, text: string) => {
    Swal.fire({ icon, title, text });
  };

  // Manejo de la venta
  const handleSale = async () => {
    if (!selectedProductId || quantity <= 0 || !selectedProduct) {
      showMessage('error', '¡Error!', 'Todos los campos deben estar completos y válidos.');
      return;
    }

    const newSale: ISale = {
      product: selectedProductId,
      userId: user?._id || '',
      total: quantity * selectedProduct.price,
      date: new Date().toISOString(),
    };

    try {
      await createSale(newSale);
      showMessage(
        'success',
        '¡Venta realizada!',
        `Producto: ${selectedProduct.title}\nCantidad: ${quantity}\nTotal: $${quantity * selectedProduct.price}`
      );

      // Reiniciar el formulario después de la venta
      setSelectedProductId('');
      setQuantity(1);

      if (onClick) onClick();
    } catch (error) {
      console.error('Error al realizar la venta:', error);
      showMessage('error', '¡Error!', 'Hubo un problema al realizar la venta.');
    }
  };

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
        />
      </div>
      <button className="btn btn-primary w-100" onClick={handleSale}>
        Realizar Venta
      </button>
    </Modal>
  );
}

export default SaleModal;

