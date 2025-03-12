import DollarCard from "../components/DollarCard"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import UserInfoCard from "../components/UserInfoCard"
import Card from "../components/commons/Card"
import { useAuth } from "../contexts/AuthContext"

function Dashboard() {
  const {user} = useAuth()
  return (
    <div className="container-fluid min-vh-100">
      <div className="row">
        <Sidebar />
        <div className="col-md-9">
          <Header/>
          <div className="row pt-6 mt-6">  
            <UserInfoCard userName={user?.name}/>  
            <DollarCard />
            <Card title="Card Title 1" text="Some quick example text to build on the card title and make up the bulk of the card's content." buttonText="Go somewhere" />
        

          </div>
          <div className="row">
            <Card title="Card Title 4" text="Some quick example text to build on the card title and make up the bulk of the card's content." buttonText="Go somewhere" />
            <Card title="Card Title 5" text="Some quick example text to build on the card title and make up the bulk of the card's content." buttonText="Go somewhere" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
