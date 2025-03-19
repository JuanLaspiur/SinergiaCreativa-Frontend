// PasswordValidation.tsx
import React, { useState, useEffect } from "react";

interface PasswordValidationProps {
  password: string;
}

const PasswordValidation = ({ password }: PasswordValidationProps) => {
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  useEffect(() => {
    const validatePassword = (password: string) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (regex.test(password)) {
        setPasswordStrength("Fuerte");
        setPasswordError("");  
      } else if (password.length >= 6) {
        setPasswordStrength("Moderada");
        setPasswordError("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial.");
      } else {
        setPasswordStrength("Débil");
        setPasswordError("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial.");
      }
    };

    validatePassword(password);
  }, [password]);

  return (
    <div className="my-2 d-flex flex-column">
      <small
        className={`mb-2 ${passwordStrength === "Fuerte" ? "text-success" : passwordStrength === "Moderada" ? "text-warning" : "text-danger"}`}
      >
        {passwordStrength && `Fuerza de la contraseña: ${passwordStrength}`}
      </small>
      {passwordError && (
        <small className="text-danger">
          {passwordError}
        </small>
      )}
    </div>
  );
};

export default PasswordValidation;
