import { useState } from 'react';
import { FaBoxOpen, FaChartBar } from 'react-icons/fa'; 
import { useSales } from '../../../contexts/SaleContext';
import Header from '../../commons/Header';
import { DollarCard, SaleModal, UserInfoCard, Clock, ProductTable } from './componentsExports';
import Tab from '../../commons/Tab';
import SalesTable from './SalesTable';
import './Home.css';

interface HomeProps {
  userName: string | undefined;
}

function Home({ userName }: HomeProps) {
  const [isSaleCardOpen, setIsSaleCardOpen] = useState(false);
  const { dailySales, monthlySales } = useSales();

  const handleNewSaleClick = () => {
    setIsSaleCardOpen(!isSaleCardOpen);
  };

  const tabs = [
    {
      title: "Productos",
      icon: <FaBoxOpen />, 
      component: (
        <div className="row">
          <ProductTable />
        </div>
      ),
    },
    {
      title: "Ventas",
      icon: <FaChartBar />,
      component: (
        <div className="row">
          <SalesTable />
        </div>
      ),
    },
  ];

  return (<>
    <div className="col-md-9">
      <Header title="Bienvenido a tu Dashboard" onClick={handleNewSaleClick} />
      <div className="row pt-6 my-6 home-background-animation">
        <UserInfoCard userName={userName} dailySales={dailySales} monthlySales={monthlySales} />
        <DollarCard />
    
        <Clock />
      </div>
      <Tab tabs={tabs} />
    </div>   
     <SaleModal onClick={handleNewSaleClick} show={isSaleCardOpen} />
    </>
  );
}

export default Home;
