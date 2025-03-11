import React, { useState } from "react";
import Button from "../commons/Button";
import InputField from "../commons/InputField";
import { register } from "../../services/auth";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Llamada a la función register
      await register(name, email, password);
      alert("¡Registro exitoso!");
    } catch  {
      setError("Error al registrar. Por favor, intenta de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <InputField
        id="registerName"
        label="Nombre"
        type="text"
        placeholder="Ingresa tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <InputField
        id="registerEmail"
        label="Email"
        type="email"
        placeholder="Ingresa tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        id="registerPassword"
        label="Contraseña"
        type="password"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <InputField
        id="registerConfirmPassword"
        label="Confirmar Contraseña"
        type="password"
        placeholder="Repite tu contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button label="Regístrate" type="submit" />
    </form>
  );
};

export default RegisterForm;
