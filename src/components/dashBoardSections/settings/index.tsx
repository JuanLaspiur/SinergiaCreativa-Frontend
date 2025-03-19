import { Header } from "../../commons/componentsExports";
import { FaLock, FaTrashAlt } from "react-icons/fa"; 
import { MdSecurity } from "react-icons/md";

function Settings() {
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
            <button className="btn btn-primary">
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
            <button className="btn btn-danger">
              <FaTrashAlt className="me-2" /> Eliminar Cuenta
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Settings;
