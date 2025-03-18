import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSales } from '../contexts/SaleContext';
import Swal from 'sweetalert2';
import { IProduct } from '../interfaces/Product';
import { IdataSale } from '../interfaces/Sale';

const useHandleSale = (onClick?: () => void) => {
  const { user } = useAuth();
  const { addSale } = useSales();
  const [loading, setLoading] = useState<boolean>(false);

  const showMessage = (icon: 'success' | 'error', title: string, text: string) => {
    Swal.fire({ icon, title, text });
  };

  const handleSale = async (
    selectedProduc:IProduct | undefined ,
    quantity: number,
    profit:number
  ) => {
    if(!selectedProduc)
        return

    if (!selectedProduc?._id || quantity <= 0) {
      showMessage('error', '¡Error!', 'Todos los campos deben estar completos y válidos.');
      return;
    }
   

    const newSale: IdataSale = {
      product: selectedProduc?._id,
      userId: user?._id || '',
      total: quantity * selectedProduc?.price,
      date: new Date().toISOString(),
      profit
    };

    setLoading(true);

    try {
      await addSale(newSale);
      showMessage(
        'success',
        '¡Venta realizada!',
        `Producto: ${selectedProduc?.title}\nCantidad: ${quantity}\nTotal: $${quantity * selectedProduc?.price}`
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
