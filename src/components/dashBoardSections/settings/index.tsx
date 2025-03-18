import { Header } from "../../commons/componentsExports";

function Settings() {
  return (
    <div className="col-md-9">
      <Header title="Settings" />
      <div className="row pt-6 mt-6">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Información del Perfil</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Ingrese su nombre de usuario"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingrese su correo electrónico"
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="notifications"
                  />
                  <label className="form-check-label" htmlFor="notifications">
                    Activar notificaciones
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Seguridad</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingrese su nueva contraseña"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirme su nueva contraseña"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Cambiar Contraseña
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
