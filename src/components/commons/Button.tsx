import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  isLoading?:boolean
}

const Button: React.FC<ButtonProps> = ({ label, type = 'button', className = '', onClick, isLoading }) => {
  return (
    <button
      type={type}
      className={`btn btn-primary w-100 ${className}`}
      onClick={onClick}
    >
       {isLoading && (
        <FaSpinner className="me-2" style={{ animation: "spin 1s linear infinite", fontSize: "1.2rem" }} />
      )}
      {label}
    </button>
  );
};

export default Button;
