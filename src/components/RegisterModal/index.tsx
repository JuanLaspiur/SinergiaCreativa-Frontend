import React from 'react';
import { RegisterModalProps } from '../../interfaces/RegisterModalProps';
import Modal from '../commons/Modal';
import RegisterForm from './RegisterForm';


const RegisterModal: React.FC<RegisterModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <Modal title="Registro" onClose={onClose}>
      <RegisterForm  onClose={onClose}/>
    </Modal>
  );
};

export default RegisterModal;
