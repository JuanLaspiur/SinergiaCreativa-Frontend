interface HeaderProps {
  onClick:()=>void;
}

function Header({ onClick }: HeaderProps) {
 

  return (
    <div className="d-flex justify-content-between align-items-center my-5 pt-5">
      <h1>Bienvenido a tu Dashboard</h1>
      <button className="btn btn-primary" onClick={onClick}>
       Nueva venta
      </button>
    </div>
  );
}

export default Header;
