import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSales } from '../contexts/SaleContext';
import Swal from 'sweetalert2';

interface Sale {
  product: string;
  userId: string;
  total: number;
  date: string;
}

const useHandleSale = (onClick?: () => void) => {
  const { user } = useAuth();
  const { addSale } = useSales();
  const [loading, setLoading] = useState<boolean>(false);

  const showMessage = (icon: 'success' | 'error', title: string, text: string) => {
    Swal.fire({ icon, title, text });
  };

  const handleSale = async (
    selectedProductId: string,
    selectedProductPrice: number,
    selectedProductName:string | undefined,
    quantity: number
  ) => {
    if (!selectedProductId || quantity <= 0) {
      showMessage('error', '¡Error!', 'Todos los campos deben estar completos y válidos.');
      return;
    }

    const newSale: Sale = {
      product: selectedProductId,
      userId: user?._id || '',
      total: quantity * selectedProductPrice,
      date: new Date().toISOString(),
    };

    setLoading(true);

    try {
      await addSale(newSale);
      showMessage(
        'success',
        '¡Venta realizada!',
        `Producto: ${selectedProductName}\nCantidad: ${quantity}\nTotal: $${quantity * selectedProductPrice}`
      );
      if (onClick) onClick();
    } catch (error) {
      console.error('Error al realizar la venta:', error);
      showMessage('error', '¡Error!', 'Hubo un problema al realizar la venta.');
    } finally {
      setLoading(false);
    }
  };

  return { handleSale, loading };
};

export default useHandleSale;
