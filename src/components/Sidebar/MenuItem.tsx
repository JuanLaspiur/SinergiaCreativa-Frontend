import React from 'react';

interface MenuItemProps {
  name: string;
  icon: JSX.Element;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, icon }) => (
  <li className="nav-item">
    <a href="#" className="nav-link text-white d-flex align-items-center gap-2">
      {icon} {name}
    </a>
  </li>
);

export default MenuItem;
