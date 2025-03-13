import { FC } from "react";
import { IconContext } from "react-icons"; // Si usas react-icons o puedes usar cualquier ícono de Bootstrap

interface HeaderProps {
  title: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ title, onClick, icon }) => {
  return (
    <div className="d-flex justify-content-between align-items-center my-5 pt-5">
      <div className="d-flex align-items-center">
        {icon && (
          <div className="me-3" style={{ fontSize: '2rem' }}>
            {icon}
          </div>
        )}
        <h1 className="mb-0">{title}</h1> {/* mb-0 para eliminar margen inferior */}
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

