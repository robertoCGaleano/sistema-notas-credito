import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {

  return (

    <nav className="navbar">

      <div className="navbar-logo">
        SGNC
      </div>

      <div className="navbar-links">

        <Link to="/altaNC">Alta NC</Link>

        <Link to="/consultaNC">Consulta</Link>

        <Link to="/empresas">Empresas</Link>

      </div>

    </nav>

  );

}

export default NavBar;