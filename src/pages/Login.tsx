import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import RegisterModal from '../components/RegisterModal';
import RecoverPasswordModal from '../components/RecoverPasswordModal';
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showRecoverModal, setShowRecoverModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const handleSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error al iniciar sesión!",
        text: "Inténtelo más tarde",
      });
      console.error('Error al iniciar sesión:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  const toggleRecoverModal = () => {
    setShowRecoverModal(!showRecoverModal);
  };

  return (
<div className="d-flex justify-content-center align-items-center vh-100 bg-primary animate__animated animate__fadeIn animate__faster">
      <div className="card shadow-lg" style={{ width: '22rem', borderRadius: '15px' }}>
        <div className="card-body p-4">
        <div className="d-flex justify-content-center align-items-center mb-5">
          <img 
            src="/cometa.png"  
            alt="Logo" 
            style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
          />
          <h5 className="m-0 fw-bold">Sinergia</h5>
        </div>
          <h5 className="card-title text-center mb-4">Iniciar Sesión</h5>
          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
          <div className="text-center mt-3">
            <span>¿No tiene cuenta aún?{" "}
              <a href="#" onClick={toggleRegisterModal} className="text-primary fw-bold">
                Regístrate
              </a>
            </span>
          </div>
          <div className="text-center mt-2">
            <span className="text-muted" style={{ fontSize: '12px' }}>
              ¿Olvidaste la contraseña?{" "}
              <a href="#" onClick={toggleRecoverModal} className="text-primary">
                Recuperar
              </a>
            </span>
          </div>
        </div>
      </div>
      <RegisterModal show={showRegisterModal} onClose={toggleRegisterModal} />
      <RecoverPasswordModal show={showRecoverModal} onClose={toggleRecoverModal} />
    </div>
  );
};

export default Login;
