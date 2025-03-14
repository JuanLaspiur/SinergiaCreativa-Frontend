import { ISale } from "../../../interfaces/Sale"
import Header from "../../Header"
import CommissionGraph from "./graphs/CommissionGraph"
import MonthlySalesGraph from "./graphs/MonthlySalesGraph"
import NetIncomeGraph from "./graphs/NetIncomeGraph"
import SalesGraphTable from "./graphs/SalesGraphTable"
import SalesPlanningCard from "./SalesPlanningCard"
import UserInfoCard from "./UserInfoCard"
interface ProfileProps {
    dailySales: ISale[],
    monthlySales: ISale[],
    userName:string | undefined
}
function Profile({dailySales, monthlySales, userName}:ProfileProps) {
  return (
    <div className="col-md-9">
    <Header title="Profile"  />
    <div className="row pt-6 mt-6">
    <UserInfoCard userName={userName} dailySales={dailySales} monthlySales={monthlySales}/>
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
  )
}

export default Profile