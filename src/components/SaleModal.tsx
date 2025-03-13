import  { useState } from 'react';
import Modal from './commons/Modal';
import Swal from 'sweetalert2';
interface SaleModalProps {
  onClick?: () => void;
  show:boolean;
}
function SaleModal({onClick, show}:SaleModalProps) {
  if (!show) return null;
  const [productName, setProductName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);

  const handleSale = () => {
    if (!productName || quantity <= 0 || price <= 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Todos los campos deben estar completos y válidos.',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: '¡Venta realizada!',
      text: `Producto: ${productName}\nCantidad: ${quantity}\nTotal: $${quantity * price}`,
    });

    setProductName('');
    setQuantity(1);
    setPrice(0);
  };

  return (
    <Modal title="Recuperar Contraseña" onClose={onClick}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Producto</label>
          <input
            type="text"
            id="productName"
            className="form-control"
            placeholder="Nombre del producto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Cantidad</label>
          <input
            type="number"
            id="quantity"
            className="form-control"
            placeholder="Cantidad"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Precio Unitario</label>
          <input
            type="number"
            id="price"
            className="form-control"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={handleSale}
        >
          Realizar Venta
        </button>
      </Modal>
  );
}

export default SaleModal;
