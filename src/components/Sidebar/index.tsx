import React, { useState } from 'react'
import { FaHome, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa'
import SidebarHeader from './SidebarHeader'
import Menu from './Menu'

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const menuOptions = [
    { name: 'Home', icon: <FaHome /> },
    { name: 'Settings', icon: <FaCog /> },
    { name: 'Profile', icon: <FaUser /> },
    { name: 'Logout', icon: <FaSignOutAlt /> }
  ]

  return (
    <>
      <div className="col-md-3 bg-dark text-white px-4 py-1 d-block d-md-none position-absolute" style={{ zIndex: 9999999 }}>
        <SidebarHeader toggleMenu={toggleMenu} />
        {/* Menú para pantallas pequeñas */}
        {isOpen && <Menu options={menuOptions} />}
      </div>

      <div className="col-md-3 bg-dark h-[100vh] text-white px-4 py-5 d-none d-md-block" style={{ zIndex: 9999999 }}>
        <SidebarHeader toggleMenu={toggleMenu} />
        {/* Menú para pantallas grandes */}
        <Menu options={menuOptions} />
      </div>
    </>
  )
}

export default Sidebar
