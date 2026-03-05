import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "./ConsultaNC.css";

function ConsultaNC() {
  const navigate = useNavigate();
  // estado para filtros
  const [filtros, setFiltros] = useState({
    numeroCliente: "",
    cuit: "",
    fechaDesde: "",
    fechaHasta: "",
    usuario: "",
    estado: ""
  });

  // estado donde se guardan las notas que vienen del backend
  const [notasCredito, setNotasCredito] = useState([]);

  // cuando la pantalla se carga llama al backend
  useEffect(() => {
    async function cargarNotas() {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
        const response = await fetch(
          `http://localhost:3001/notas?legajo=${usuario.legajo}&admin=${usuario.admin}`);
        const data = await response.json();
        setNotasCredito(data);
      } catch (error) {
        console.log("Error al cargar notas");
      }
    }
    cargarNotas();
  }, []);

  function handleFiltroChange(e) {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });

  }

  //Boton ver
  function handleVer(id) {
    navigate(`/detalleNC/${id}`);
  }
  //Boton borrar
  async function handleBorrar(id) {
  const confirmar = window.confirm("¿Seguro que querés borrar esta Nota de Crédito?");
  if (!confirmar) return;
  try {
    const response = await fetch(`http://localhost:3001/notas/${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
      return;
    }
    alert("Nota eliminada correctamente");
    // actualiza la tabla sin recargar la página
    setNotasCredito(notasCredito.filter(nc => nc.idNotaCredito !== id));

  } catch (error) {
    alert("Error al eliminar la nota");
  }
}
  //FILTROS
  const notasFiltradas = notasCredito.filter((nc) => {

    return (
      (filtros.numeroCliente === "" || nc.Empresa?.nroCliente?.toString().includes(filtros.numeroCliente)) &&
      (filtros.cuit === "" || nc.Empresa?.cuit?.includes(filtros.cuit)) &&
      (filtros.usuario === "" || nc.Usuario?.nombre?.toLowerCase().includes(filtros.usuario.toLowerCase())) &&
      (filtros.estado === "" || nc.estado === filtros.estado) &&
      (filtros.fechaDesde === "" || new Date(nc.fechaCreacion) >= new Date(filtros.fechaDesde)) &&
      (filtros.fechaHasta === "" || new Date(nc.fechaCreacion) <= new Date(filtros.fechaHasta))   
    );

  });

  return (
    <>
      <NavBar />

      <div className="consulta-container">

        <h2 className="titulo">Consulta de Notas de Crédito</h2>
        <p className="subtitulo">Filtrar por:</p>

        <div className="filtros">

          <input
            name="numeroCliente"
            placeholder="Número de Cliente"
            value={filtros.numeroCliente}
            onChange={handleFiltroChange}
          />

          <input
            name="cuit"
            placeholder="CUIT"
            value={filtros.cuit}
            onChange={handleFiltroChange}
          />

          <input
            type="date"
            name="fechaDesde"
            value={filtros.fechaDesde}
            onChange={handleFiltroChange}
          />

          <input
            type="date"
            name="fechaHasta"
            value={filtros.fechaHasta}
            onChange={handleFiltroChange}
          />

          <input
            name="usuario"
            placeholder="Nombre Usuario"
            value={filtros.usuario}
            onChange={handleFiltroChange}
          />

          <select
            name="estado"
            value={filtros.estado}
            onChange={handleFiltroChange}
          >
            <option value="">Estados</option>
            <option value="aprobada">Aprobada</option>
            <option value="enProceso">En Proceso</option>
            <option value="rechazada">Rechazada</option>
          </select>

        </div>
        <p className="subtitulo">Total de Notas de Creditos: {notasFiltradas.length}</p>
        <table>

          <thead>
          
            <tr>
              <th>Empresa</th>
              <th>N° Cliente</th>
              <th>CUIT</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {notasFiltradas.map((nc) => (

              <tr key={nc.idNotaCredito}>

                <td>{nc.Empresa?.razonSocial}</td>
                <td>{nc.Empresa?.nroCliente}</td>
                <td>{nc.Empresa?.cuit}</td>
                <td>${nc.monto}</td>
                <td>{nc.estado}</td>
                <td>{nc.fechaCreacion}</td>
                <td>{nc.Usuario?.nombre}</td>

                <td>

                  <button onClick={() => handleVer(nc.idNotaCredito)}>
                    Ver
                  </button>

                  <button onClick={() => handleBorrar(nc.idNotaCredito)}>
                    Borrar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>

  );

}

export default ConsultaNC;