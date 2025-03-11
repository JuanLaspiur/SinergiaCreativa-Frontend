import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value = "",
  placeholder = "",
  required = false,
  onChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className="input-group">
        <input
          type={type === "password" && isPasswordVisible ? "text" : type}
          className="form-control"
          id={id}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
          value={value}
          onChange={onChange}
          required={required}
        />
        {type === "password" && (
          <span
            className="input-group-text"
            style={{ cursor: "pointer" }}
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
