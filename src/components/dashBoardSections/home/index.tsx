import { useState } from 'react';
import { useSales } from '../../../contexts/SaleContext';
import Header from '../../commons/Header';
import ProductTable from '../../ProductTable';
import DollarCard from './DollarCard';
import SaleModal from './SaleModal';
import UserInfoCard from './UserInfoCard';

import Tab from '../../commons/Tab';  
import SalesTable from '../../SalesTable';
import Clock from './Clock';

interface HomeProps {
  userName: string | undefined;
}

function Home({ userName }: HomeProps) {
  const [isSaleCardOpen, setIsSaleCardOpen] = useState(false);
  const {dailySales, monthlySales} = useSales()
  const handleNewSaleClick = () => {
    setIsSaleCardOpen(!isSaleCardOpen);
  };

  const tabs = [
    {
      title: "Productos",
      component: (
        <div className="row">
          <ProductTable />
        </div>
      ),
    },
    {
      title: "Ventas",
      component: (
        <div className="row">
          <SalesTable/>
        </div>
      ),
    },
  ];

  return (
    <div className="col-md-9">
      <Header title="Bienvenido a tu Dashboard" onClick={handleNewSaleClick} />
      <div className="row pt-6 my-6">
        <UserInfoCard userName={userName} dailySales={dailySales} monthlySales={monthlySales} />
        <DollarCard />
        <SaleModal onClick={handleNewSaleClick} show={isSaleCardOpen} />
        <Clock/>
      </div>
      <Tab tabs={tabs} />
    </div>
  );
}

export default Home;
