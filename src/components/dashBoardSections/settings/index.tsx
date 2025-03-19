import { Header } from "../../commons/componentsExports";
import { FaLock, FaTrashAlt } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import Swal from "sweetalert2"; 
import ChangePasswordModal from "./ChangePasswordModal";
import { useNavigate } from "react-router-dom"; 

function Settings() {
  const { removeUser } = useAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const navigate = useNavigate(); 

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        removeUser(); 
        Swal.fire("Eliminado", "Tu cuenta ha sido eliminada", "success");
        navigate("/"); 
      }
    });
  };

  return (
    <div className="col-md-9">
      <Header title="Settings" />
      <div className="container mt-4">
        <div className="card mb-4" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="card-body">
            <h4 className="card-title">
              <MdSecurity className="me-2" /> Seguridad
            </h4>
            <p className="card-text">
              Cambia tu contraseña para mantener tu cuenta segura.
            </p>
            <button className="btn btn-primary" onClick={() => setShowPasswordModal(true)}>
              <FaLock className="me-2" /> Cambiar Contraseña
            </button>
          </div>
        </div>

        <div className="card" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="card-body">
            <h4 className="card-title">
              <FaTrashAlt className="me-2" /> Eliminar Cuenta
            </h4>
            <p className="card-text">
              Ten en cuenta que esta acción es irreversible.
            </p>
            <button className="btn btn-danger" onClick={handleDeleteAccount}>
              <FaTrashAlt className="me-2" /> Eliminar Cuenta
            </button>
          </div>
        </div>
      </div>

      <ChangePasswordModal show={showPasswordModal} onClose={() => setShowPasswordModal(false)} />
    </div>
  );
}

export default Settings;
