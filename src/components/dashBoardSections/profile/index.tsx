import {Header, Tab} from "../../commons/componentsExports";
import { useSales } from "../../../contexts/SaleContext";
import {CommissionGraph, MonthlySalesGraph, NetIncomeGraph, SalesTableGraph} from "./graphs/componentsExports";
import SalesPlanningCard from "./SalesPlanningCard";
import UserInfoCard from "./UserInfoCard";
import { IUser } from "../../../interfaces/User";
import MonthlyIncomeCard from "./MonthlyIncomeCard";

interface ProfileProps {
    user:IUser | null
}
function Profile({ user}:ProfileProps) {
const {dailySales, monthlySales, userSales} = useSales();
  const tabs = [
    {
      title: "Ventas",
      component: (
        <div className="row pt-6 mt-6">
        <div className="col-md-6">
          <SalesTableGraph />
        </div>
        <div className="col-md-6">
        <MonthlySalesGraph userExpected ={user?.expectedMonthlyIncome}/>
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
    <UserInfoCard userName={user?.name}  dailySales={dailySales} monthlySales={monthlySales} userSales={userSales}/>
    <SalesPlanningCard userExpected ={user?.expectedMonthlyIncome} userId={user?._id} monthlySales={monthlySales}/>
    <MonthlyIncomeCard monthlySales={monthlySales}/>
    </div>
    <Tab tabs={tabs} />
   
  </div>
  )
}

export default Profile