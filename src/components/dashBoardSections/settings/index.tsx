import { Header } from "../../commons/componentsExports";
import { FaLock, FaTrashAlt } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import Swal from "sweetalert2";
import ChangePasswordModal from "./ChangePasswordModal";
import { useNavigate } from "react-router-dom";
import SettingsCard from "../../commons/SettingsCard";

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
        <SettingsCard
          icon={MdSecurity}
          title="Seguridad"
          text="Cambia tu contraseña para mantener tu cuenta segura."
          buttonLabel="Cambiar Contraseña"
          buttonIcon={FaLock}
          onClick={() => setShowPasswordModal(true)}
        />
        <SettingsCard
          icon={FaTrashAlt}
          title="Eliminar Cuenta"
          text="Ten en cuenta que esta acción es irreversible."
          buttonLabel="Eliminar Cuenta"
          buttonIcon={FaTrashAlt}
          onClick={handleDeleteAccount}
          bgColor="#ffecec"
          btnClass="btn btn-danger"
        />
      </div>

      <ChangePasswordModal
        show={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
}

export default Settings;
