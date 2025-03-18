import { FC } from "react";
import { IProduct } from "../../../../interfaces/Product";
import { getCommission } from "../../../../helpers/productHelpers";
import Modal from "../../../commons/Modal";
import { useSales } from "../../../../contexts/SaleContext";

interface ProductDetailModalProps {
  product: IProduct | null;
  onClose: () => void;
}

const ProductDetailModal: FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { monthlySales } = useSales();

  if (!product) return null;

  const commission = getCommission(product, monthlySales);
  const commissionRate = 0.1;
  const gain = product.price * commissionRate; 

  return (
    <Modal onClose={onClose} title="Detalles del Producto">
      <div className="product-detail">
        <img 
          src={product.image} 
          alt={product.title} 
          className="img-fluid mb-3 w-25" 
        />
        <h4>{product.title}</h4>
        <p><strong>Descripción:</strong> {product.description || 'No disponible'}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p><strong>Precio:</strong> $$ {product.price}</p>
        <p>
          <strong className="text-warning font-weight-bold">
            Comisión Actual: $$ {commission}
          </strong>
        </p>
        <p>
          <strong className="text-warning font-weight-bold">
            Tu ganancia: $$ {gain.toFixed(2)} 
          </strong>
        </p>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
