import { FC } from "react";
import { FaCogs, FaUser } from 'react-icons/fa'; 
interface HeaderProps {
  title: string;
  onClick?: () => void;
}

const Header: FC<HeaderProps> = ({ title, onClick }) => {
  
    const getIconForTitle = (title: string) => {
      switch (title) {
        case 'Bienvenido a tu Dashboard':
          return null;
        case 'Settings':
          return <FaCogs />;
        case 'Profile':
          return <FaUser />;
        default:
          return null;
      }
    };
  return (
    <div className="d-flex justify-content-between align-items-center my-5 pt-5">
      <div className="d-flex align-items-center">
        {getIconForTitle(title) && (
          <div className="me-3" style={{ fontSize: '2rem' }}>
            {getIconForTitle(title)}
          </div>
        )}
        <h1 className="mb-0">{title}</h1> 
      </div>
      {onClick && (
        <button className="btn btn-primary" onClick={onClick}>
          Nueva venta
        </button>
      )}
    </div>
  );
};

export default Header;

