import React from 'react'
import MenuItem from './MenuItem'

interface MenuProps {
  options: { name: string; icon: JSX.Element }[];
}

const Menu: React.FC<MenuProps> = ({ options }) => (
  <ul className="nav flex-column">
    {options.map((option, index) => (
      <MenuItem key={index} name={option.name} icon={option.icon} />
    ))}
  </ul>
)

export default Menu
