import { useState } from "react";
import DollarCard from "../components/DollarCard";
import Header from "../components/Header";
import ProductTable from "../components/ProductTable";
import SaleModal from "../components/SaleModal";
import Sidebar from "../components/Sidebar";
import UserInfoCard from "../components/UserInfoCard";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const [isSaleCardOpen, setIsSaleCardOpen] = useState(false); 
  const handleNewSaleClick = () => {
    setIsSaleCardOpen(!isSaleCardOpen);
  };
return(
    <div className="container-fluid min-vh-100">
      <div className="row">
        <Sidebar />
        <div className="col-md-9">
          <Header
            onClick={handleNewSaleClick}
          />
          <div className="row pt-6 mt-6">
            <UserInfoCard userName={user?.name} />
            <DollarCard />
            <SaleModal onClick={handleNewSaleClick} show={isSaleCardOpen}/>
          </div>
          <div className="row">
            <ProductTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

