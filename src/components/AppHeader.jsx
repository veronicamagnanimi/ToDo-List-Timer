import { Link, useNavigate } from "react-router-dom";

const AppHeader = () => {
  const navigate = useNavigate(); //navigazione tra le pagine

  const handleLogout = () => {
    sessionStorage.removeItem("token"); //rimozione del token di autenticazione
    navigate("/login"); //reindirizza al login
  };

  return (
    <header>
      <nav className="nav-item py-4 px-5">
        <div className="d-flex gap-4">
          <Link to="/" className="text-white text-decoration-none">
            Home
          </Link>
          <Link to="/dashboard" className="text-white text-decoration-none">
            Dashboard
          </Link>
        </div>
        <button onClick={handleLogout} className="btn px-4">
          Esci
        </button>
      </nav>
    </header>
  );
};

export default AppHeader;
