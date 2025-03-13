import { useState } from 'react';
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

  if (!show) return null;

  const selectedProduct = products.find(product => product._id === selectedProductId);

  const handleSale = async () => {
    if (!selectedProductId || quantity <= 0 || !selectedProduct) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Todos los campos deben estar completos y válidos.',
      });
      return;
    }

    // Crear el objeto de venta
    const newSale: ISale = {
      product: selectedProductId, 
      userId: user?._id || '',  
      total: quantity * selectedProduct.price,
      date: new Date().toISOString(),
    };

    try {
      await createSale(newSale);

      Swal.fire({
        icon: 'success',
        title: '¡Venta realizada!',
        text: `Producto: ${selectedProduct?.title}\nCantidad: ${quantity}\nTotal: $${quantity * selectedProduct.price}`,
      });

      setSelectedProductId('');
      setQuantity(1);

      if (onClick) onClick();
    } catch {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Hubo un problema al realizar la venta.',
      });
    }
  };

  return (
    <Modal title="Realizar Venta" onClose={onClick}>
      <div className="mb-3">
        <label htmlFor="productName" className="form-label">
          Producto
        </label>
        <select
          id="productName"
          className="form-select w-100"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          style={{ fontSize: '0.875rem' }} 
        >
          <option value="">Seleccione un producto</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">
          Cantidad
        </label>
        <input
          type="number"
          id="quantity"
          className="form-control w-100"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Precio Unitario
        </label>
        <input
          type="text" 
          id="price"
          className="form-control w-100"
          placeholder="Precio"
          value={selectedProduct ? selectedProduct.price : 0} 
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

