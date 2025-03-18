import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { createSale, getAllSales, getDailySales, getMonthlySales, getSalesByUserId } from '../services/sale';
import {ISale, SalesContextType, IdataSale} from '../interfaces/Sale' 


const SalesContext = createContext<SalesContextType | undefined>(undefined);

export const useSales = (): SalesContextType => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error('useSales must be used within a SalesProvider');
  }
  return context;
};

export const SalesProvider = ({ children }: { children: ReactNode }) => {
  const [sales, setSales] = useState<ISale[]>([]);
  const [dailySales, setDailySales] = useState<ISale[]>([]);
  const [monthlySales, setMonthlySales] = useState<ISale[]>([]);
  const [userSales, setUserSales] = useState<ISale[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [updateTriggered, setUpdateTriggered] = useState(false);


  const { user } = useAuth()
  const userId = user?._id as string;

  const fetchAllSales = async () => {
    try {
      const result = await getAllSales();
      setSales(result);
    } catch  {
      setError('Failed to fetch all sales');
    }
  };

  const fetchDailySales = async () => {
    try {
      const result = await getDailySales(userId);
      setDailySales(result.data);
    } catch  {
      setError('Failed to fetch daily sales');
    }
  };

  const fetchMonthlySales = async () => {
    try {
      const result = await getMonthlySales(userId);
      setMonthlySales(result.data);
    } catch  {
      setError('Failed to fetch monthly sales');
    }
  };

  const fetchUserSales = async () => {
    try {
      const result = await getSalesByUserId(userId);
      setUserSales(result.data);
    } catch {
      setError('Failed to fetch user sales');
    }
  };

  const addSale = async (saleData: IdataSale) => {
    try {
      await createSale(saleData);
      const updateEvent = new CustomEvent('updateProducts');
      window.dispatchEvent(updateEvent);
    } catch  {
      setError('Failed to create sale');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAllSales();
      fetchDailySales();
      fetchMonthlySales();
      fetchUserSales();
    }
  }, [userId, user?._id, updateTriggered]); 

  useEffect(() => {
    const handleUpdateEvent = () => {
      setUpdateTriggered(prevState => !prevState); 
    };

    window.addEventListener('updateProducts', handleUpdateEvent);
    return () => {
      window.removeEventListener('updateProducts', handleUpdateEvent);
    };
  
  },[])
  return (
    <SalesContext.Provider
      value={{ sales, dailySales, monthlySales, userSales, error, addSale, fetchAllSales, fetchDailySales, fetchMonthlySales, fetchUserSales }}
    >
      {children}
    </SalesContext.Provider>
  );
};
