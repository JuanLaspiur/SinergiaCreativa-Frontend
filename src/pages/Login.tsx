import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import RegisterModal from '../components/RegisterModal';
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { login } = useAuth();

  const handleSubmit = async (email: string, password: string) => {
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
    }
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card" style={{ width: '20rem' }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Login</h5>
          <LoginForm onSubmit={handleSubmit} />
          <div className="text-center mt-3">
            <span>¿No tiene cuenta aún? <a href="#" onClick={handleModalToggle}>Regístrate</a></span>
          </div>
        </div>
      </div>
      <RegisterModal show={showModal} onClose={handleModalToggle} />
    </div>
  );
};

export default Login;
