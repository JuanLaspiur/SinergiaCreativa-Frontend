import React, { useState } from "react";
import Swal from "sweetalert2";
import {InputField, Button} from "../commons/export";
import { register } from "../../services/auth";
interface registerFormProps {
  onClose: () => void;
}

const RegisterForm = ({onClose}:registerFormProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    try {
      await register(name, email, password);
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Te has registrado correctamente.",
        showConfirmButton: false,
        timer: 1500,
      });
      clearFilds()
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Error al registrar. Por favor, intenta de nuevo.",
      });
    }
  };

  const clearFilds = ()=>{
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("")  
  }

  return (
    <form onSubmit={handleSubmit}>
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
