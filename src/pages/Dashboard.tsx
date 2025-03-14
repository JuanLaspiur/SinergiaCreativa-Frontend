import { useState, useEffect } from "react";
import { FaHome, FaCogs, FaUser } from 'react-icons/fa'; 
import DollarCard from "../components/DollarCard";
import Header from "../components/Header";
import ProductTable from "../components/ProductTable";
import SaleModal from "../components/SaleModal";
import Sidebar from "../components/Sidebar";
import UserInfoCard from "../components/UserInfoCard";
import { useAuth } from "../contexts/AuthContext";
import SalesPlanningCard from "../components/SalesPlanningCard";
import ScrollToTopButton from "../components/ScrollToTopButton"; 
import {SalesGraphTable,MonthlySalesGraph, NetIncomeGraph, CommissionGraph } from "../components/graphs/export"


function Dashboard() {
  const { user, logout } = useAuth();
  const [isSaleCardOpen, setIsSaleCardOpen] = useState(false); 
  const [selectedMenu, setSelectedMenu] = useState<string>('Home'); 
  const [showScrollButton, setShowScrollButton] = useState(false); 

  const handleNewSaleClick = () => {
    setIsSaleCardOpen(!isSaleCardOpen);
  };

  const getIconForTitle = (title: string) => {
    switch (title) {
      case 'Home':
        return <FaHome />;
      case 'Settings':
        return <FaCogs />;
      case 'Profile':
        return <FaUser />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > (window.innerHeight / 3)) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container-fluid min-vh-100">
      <div className="row">
        <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} logout={logout} /> 
        {(selectedMenu === 'Home' || selectedMenu === 'Logout') && (
          <div className="col-md-9">
            <Header title="Bienvenido a tu Dashboard" onClick={handleNewSaleClick} icon={getIconForTitle('Home')} />
            <div className="row pt-6 mt-6">
              <UserInfoCard userName={user?.name} />
              <DollarCard />
              <SaleModal onClick={handleNewSaleClick} show={isSaleCardOpen} />
            </div>
            <div className="row">
              <ProductTable />
            </div>
          </div>
        )}
        {selectedMenu === 'Settings' && (
          <div className="col-md-9">
            <Header title="Settings" icon={getIconForTitle('Settings')} />
            <div className="row pt-6 mt-6">
            </div>
          </div>
        )}

        {selectedMenu === 'Profile' && (
          <div className="col-md-9">
            <Header title="Profile" icon={getIconForTitle('Profile')} />
            <div className="row pt-6 mt-6">
              <UserInfoCard userName={user?.name} />
              <SalesPlanningCard />
            </div>
            <div className="row pt-6 mt-6">
              <div className="col-md-6">
                <SalesGraphTable />
              </div>
              <div className="col-md-6">
              <MonthlySalesGraph/>
              </div>
            </div>
            <div className="row pt-6 mt-6">
            <div className="col-md-6">
            <NetIncomeGraph/>
            </div>
            <div className="col-md-6">
            <CommissionGraph/>
            </div>
            </div>
          </div>
        )}
      </div>

      <ScrollToTopButton showScrollButton={showScrollButton} />
    </div>
  );
}

export default Dashboard;
