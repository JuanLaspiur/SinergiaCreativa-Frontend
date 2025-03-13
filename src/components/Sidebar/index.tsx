import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Reemplaza useNavigation por useNavigate
import { FaHome, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import SidebarHeader from './SidebarHeader';
import Menu from './Menu';

interface SidebarProps {
  selectedMenu?: string; 
  setSelectedMenu: (menuName: string) => void; 
  logout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedMenu, logout }) => {
  const navigate = useNavigate();  // Cambiar useNavigation por useNavigate
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (menuName: string) => {
    setSelectedMenu(menuName); 
    console.log(`Opción seleccionada: ${menuName}`);
    if(menuName === 'Logout') {  // Comparar con '===' en lugar de '=='
      navigate('/');  // Usar navigate para redirigir
      logout();  // Ejecutar el logout
    }
  };

  const menuOptions = [
    { name: 'Home', icon: <FaHome /> },
    { name: 'Profile', icon: <FaUser /> },  
    { name: 'Settings', icon: <FaCog /> },
    { name: 'Logout', icon: <FaSignOutAlt /> },
  ];

  return (
    <>
      <div className="col-md-3 bg-dark text-white px-4 py-1 d-block d-md-none position-absolute" style={{ zIndex: 9999999 }}>
        <SidebarHeader toggleMenu={toggleMenu} />
        {/* Menú para pantallas pequeñas */}
        {isOpen && <Menu options={menuOptions} onClick={handleMenuClick} />}
      </div>

      <div className="col-md-3 bg-dark min-vh-100 text-white px-4 py-5 d-none d-md-block" style={{ zIndex: 9999999 }}>
        <div className="position-fixed">
          <SidebarHeader toggleMenu={toggleMenu} />
          <Menu options={menuOptions} onClick={handleMenuClick} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
