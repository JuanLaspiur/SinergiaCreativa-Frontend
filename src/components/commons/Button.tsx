import React from 'react';

interface ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, type = 'button', className = '', onClick }) => {
  return (
    <button
      type={type}
      className={`btn btn-primary w-100 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
