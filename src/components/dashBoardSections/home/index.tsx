import { useState } from 'react'
import Header from '../../commons/Header'
import ProductTable from '../../ProductTable'
import DollarCard from './DollarCard'
import SaleModal from './SaleModal'
import UserInfoCard from './UserInfoCard'
import { ISale } from '../../../interfaces/Sale'

interface HomeProps {
    dailySales: ISale[],
    monthlySales: ISale[],
    userName:string | undefined
  
}

function Home({dailySales, monthlySales, userName}:HomeProps) {
const [isSaleCardOpen, setIsSaleCardOpen] = useState(false);
const handleNewSaleClick = () => {
    setIsSaleCardOpen(!isSaleCardOpen);
  };

  return (
    <div className="col-md-9">
    <Header title="Bienvenido a tu Dashboard" onClick={handleNewSaleClick}  />
    <div className="row pt-6 mt-6">
      <UserInfoCard userName={userName} dailySales={dailySales} monthlySales={monthlySales}/>
      <DollarCard />
      <SaleModal onClick={handleNewSaleClick} show={isSaleCardOpen} />
    </div>
    <div className="row">
      <ProductTable />
    </div>
  </div>
  )
}

export default Home