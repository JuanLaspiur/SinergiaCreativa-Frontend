import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../../contexts/AuthContext";
import { Modal } from "../../commons/componentsExports";
import InputField from "../../commons/InputField";
import { FaLock } from "react-icons/fa";

interface ChangePasswordModalProps {
  show: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ show, onClose }) => {
  const { changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  if(!show){
    return null
  }
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      Swal.fire("Éxito", "Contraseña cambiada correctamente", "success");
      onClose(); 
    } catch {
      Swal.fire("Error", "Hubo un error al cambiar la contraseña", "error");
    }
  };

  return (
    <Modal onClose={onClose} title="Cambiar Contraseña" >
      <div>
        <InputField
          id="currentPassword"
          label="Contraseña Actual"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <InputField
          id="newPassword"
          label="Nueva Contraseña"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <InputField
          id="confirmPassword"
          label="Confirmar Nueva Contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary" onClick={handleChangePassword}>
          <FaLock className="me-2" /> Cambiar Contraseña
        </button>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
