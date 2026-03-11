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
          //`https://r1kp8skz-3001.brs.devtunnels.ms/notas?legajo=${usuario.legajo}&admin=${usuario.admin}`);
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
    const response = await fetch(
      `http://localhost:3001/notas/${id}`, {
      //`https://r1kp8skz-3001.brs.devtunnels.ms/notas/${id}`, {
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
        
        <div className="notas-grid">
          {notasFiltradas.map((nc) => (
            <div key={nc.idNotaCredito} className={`nota-card ${nc.estado}`}>
              <div className="card-header">
                <span className="empresa-nombre">{nc.Empresa?.razonSocial}</span>
                <span className={`estado-nota ${nc.estado}`}>{nc.estado}</span>
              </div>
              
              <div className="card-body">
                <p><strong>Cliente:</strong> {nc.Empresa?.nroCliente}</p>
                <p><strong>CUIT:</strong> {nc.Empresa?.cuit}</p>
                <p className="monto-nota">Monto: ${nc.monto.toLocaleString()}</p>
                <p className="fecha">📅Fecha: {nc.fechaCreacion}</p>
                <p className="usuario">👤Responsable:  {nc.Usuario?.nombre}</p>
              </div>

              <div className="card-btn">
                <button className="btn-ver" onClick={() => handleVer(nc.idNotaCredito)}>
                  Ver Detalle
                </button>
                <button className="btn-borrar" onClick={() => handleBorrar(nc.idNotaCredito)}>
                  Borrar
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </>

  );

}

export default ConsultaNC;