import {Header, Tab} from "../../commons/export";
import { useSales } from "../../../contexts/SaleContext";
import {CommissionGraph, MonthlySalesGraph, NetIncomeGraph, SalesTableGraph} from "./graphs/export";
import SalesPlanningCard from "./SalesPlanningCard";
import UserInfoCard from "./UserInfoCard";

interface ProfileProps {
    userName:string | undefined
}
function Profile({ userName}:ProfileProps) {
const {dailySales, monthlySales} = useSales()
  const tabs = [
    {
      title: "Ventas",
      component: (
        <div className="row pt-6 mt-6">
        <div className="col-md-6">
          <SalesTableGraph />
        </div>
        <div className="col-md-6">
        <MonthlySalesGraph/>
        </div>
      </div>
      ),
    },
    {
      title: "Ganancias",
      component: (
        <div className="row pt-6 mt-6">
    <div className="col-md-6">
    <NetIncomeGraph/>
    </div>
    <div className="col-md-6">
    <CommissionGraph/>
    </div>
    </div>
      ),
    },
  ];


  return (
    <div className="col-md-9 pb-5">
    <Header title="Profile"  />
    <div className="row pt-6 mt-6">
    <UserInfoCard userName={userName} dailySales={dailySales} monthlySales={monthlySales}/>
    <SalesPlanningCard />
    </div>
    <Tab tabs={tabs} />
   
  </div>
  )
}

export default Profile