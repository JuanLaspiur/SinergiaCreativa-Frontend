import React, { useState } from 'react';
import {Modal} from './commons/componentsExports';
import Swal from "sweetalert2";

interface RecoverPasswordModalProps {
  show: boolean;
  onClose: () => void;
}

const RecoverPasswordModal: React.FC<RecoverPasswordModalProps> = ({ show, onClose }) => {
  const [email, setEmail] = useState<string>('');

  const handleRecover = () => {
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, ingresa tu correo.',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: `Instrucciones enviadas a ${email}`,
    });

    onClose(); 
  };

  return (
    show && (
      <Modal title="Recuperar Contraseña" onClose={onClose}>
        <div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary w-100"
            onClick={handleRecover}
          >
            Recuperar
          </button>
        </div>
      </Modal>
    )
  );
};

export default RecoverPasswordModal;
