import { useState } from 'react';
import Header from '../../commons/Header';
import ProductTable from '../../ProductTable';
import DollarCard from './DollarCard';
import SaleModal from './SaleModal';
import UserInfoCard from './UserInfoCard';
import { ISale } from '../../../interfaces/Sale';
import Tab from '../../commons/Tab';  
import SalesTable from '../../SalesTable';

interface HomeProps {
  dailySales: ISale[];
  monthlySales: ISale[];
  userName: string | undefined;
}

function Home({ dailySales, monthlySales, userName }: HomeProps) {
  const [isSaleCardOpen, setIsSaleCardOpen] = useState(false);
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
      <div className="row pt-6 mt-6">
        <UserInfoCard userName={userName} dailySales={dailySales} monthlySales={monthlySales} />
        <DollarCard />
        <SaleModal onClick={handleNewSaleClick} show={isSaleCardOpen} />
      </div>
      <Tab tabs={tabs} />
    </div>
  );
}

export default Home;
