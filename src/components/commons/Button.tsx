import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import 'animate.css';
import './Button.css';

interface ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, type = 'button', className = '', onClick, isLoading }) => {
  return (
    <button
      type={type}
      className={`btn btn-primary w-100 ${className} animate__animated ${
        isLoading ? 'animate__fadeIn' : 'animate__pulse'
      }`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading && (
        <FaSpinner
          className="me-2 spinner-icon animate__animated animate__infinite"
          style={{ fontSize: '1.2rem' }}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
