import React from 'react'
import MenuItem from './MenuItem';

interface MenuProps {
  options: { name: string; icon: JSX.Element,  onClick: (menuName: string) => void;   }[];
}

const Menu: React.FC<MenuProps> = ({ options, onClick }) => (
  <ul className="nav flex-column">
    {options.map((option, index) => (
      <MenuItem key={index} name={option.name} icon={option.icon} onClick={()=>onClick(option.name)} />
    ))}
  </ul>
)

export default Menu
