//@ts-expect-error
import React from 'react';

interface MenuItemProps {
  name: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, icon, onClick }) => (
  <li className="nav-item">
    <a href="#" onClick={onClick} className="nav-link text-white d-flex align-items-center gap-4">
      {icon} {name}
    </a>
  </li>
);

export default MenuItem;
