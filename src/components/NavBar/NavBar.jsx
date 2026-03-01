import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    navigate("/");
  };

  return (

    <nav className="navbar">

      <div className="navbar-logo">
        SGNC
      </div>

      <div className="navbar-links">

        <Link to="/altaNC">Alta NC</Link>

        <Link to="/consultaNC">Consulta</Link>

        <Link to="/empresas">Empresas</Link>

        <button 
          onClick={handleLogout} 
          className="logout-button"
        >
          Cerrar sesión
        </button>

      </div>

    </nav>

  );

}

export default NavBar;