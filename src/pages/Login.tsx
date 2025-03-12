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
        text: "Intentelo más tarde",
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
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card" style={{ width: '20rem' }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Login</h5>
          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
          <div className="text-center mt-3">
            <span>¿No tiene cuenta aún? <a href="#" onClick={toggleRegisterModal}>Regístrate</a></span>
          </div>
          <div className="text-center">

            <span className="text-muted" style={{fontSize:'12px'}}>
              ¿Olvidaste la contraseña? <a href="#" onClick={toggleRecoverModal}>Recuperar</a>
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
