import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import SidebarHeader from './SidebarHeader';
import Menu from './Menu';

interface SidebarProps {
  selectedMenu?: string;
  setSelectedMenu: (menuName: string) => void;
  logout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedMenu, logout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (menuName: string) => {
    setSelectedMenu(menuName);
    console.log(`Opción seleccionada: ${menuName}`);
    if (menuName === 'Logout') {
      navigate('/');
      logout();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.mobile-menu')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const menuOptions = [
    { name: 'Home', icon: <FaHome /> },
    { name: 'Profile', icon: <FaUser /> },
    { name: 'Settings', icon: <FaCog /> },
    { name: 'Logout', icon: <FaSignOutAlt /> },
  ];

  return (
    <>
      {/* Menú para pantallas pequeñas */}
      <div
        className="col-md-3 bg-dark text-white px-4 py-1 d-block d-md-none position-absolute mobile-menu"
        style={{ zIndex: 9999999 }}
      >
        <SidebarHeader toggleMenu={toggleMenu} />
        {isOpen && <Menu options={menuOptions} onClick={handleMenuClick} />}
      </div>

      {/* Menú para pantallas grandes */}
      <div
        className="col-md-3 bg-dark min-vh-100 text-white px-4 py-5 d-none d-md-block"
        style={{ zIndex: 9999999 }}
      >
        <div className="position-fixed">
          <SidebarHeader toggleMenu={toggleMenu} />
          <Menu options={menuOptions} onClick={handleMenuClick} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
