import React, { useState } from 'react'
import { FaHome, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom' // Importar el hook de navegación
import SidebarHeader from './SidebarHeader'
import Menu from './Menu'

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate() // Crear la función de navegación

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Función de Logout
  const handleLogout = () => {
    navigate('/') // Redirigir a la página de inicio
  }

  const menuOptions = [
    { name: 'Home', icon: <FaHome /> },
    { name: 'Settings', icon: <FaCog /> },
    { name: 'Profile', icon: <FaUser /> },
    { name: 'Logout', icon: <FaSignOutAlt />, onClick: handleLogout } // Asignar la función al Logout
  ]

  return (
    <>
      <div className="col-md-3 bg-dark text-white px-4 py-1 d-block d-md-none position-absolute" style={{ zIndex: 9999999 }}>
        <SidebarHeader toggleMenu={toggleMenu} />
        {/* Menú para pantallas pequeñas */}
        {isOpen && <Menu options={menuOptions} />}
      </div>

      <div className="col-md-3 bg-dark min-vh-100 text-white px-4 py-5 d-none d-md-block" style={{ zIndex: 9999999 }}>
        <SidebarHeader toggleMenu={toggleMenu} />
        {/* Menú para pantallas grandes */}
        <Menu options={menuOptions} />
      </div>
    </>
  )
}

export default Sidebar
