interface HeaderProps {
  userName?: string;  // El signo de interrogación indica que es opcional.
}

function Header({ userName = '' }: HeaderProps) {
  return (
    <div className="d-flex justify-content-between align-items-center my-5 pt-5">
      <h1>Welcome to your Dashboard {userName}</h1>
      <button className="btn btn-primary">New Action</button>
    </div>
  );
}

export default Header;
