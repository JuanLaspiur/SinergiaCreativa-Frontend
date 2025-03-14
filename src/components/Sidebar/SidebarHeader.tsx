import React from 'react'
import { FaBars } from 'react-icons/fa'

interface SidebarHeaderProps {
  toggleMenu: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ toggleMenu }) => (
  <div className="d-flex justify-content-between align-items-center my-2">
    <h2 className="text-center mb-0">Dashboard</h2>

    <button
      className="btn btn-dark d-md-none"
      type="button"
      onClick={toggleMenu}
      style={{ fontSize: '1.5rem', backgroundColor: 'transparent', border: 'none', color: 'white' }}
    >
      <FaBars />
    </button>
  </div>
)

export default SidebarHeader
