import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./ConsultaNC.css";

function ConsultaNC() {

  // estado para filtros
  const [filtros, setFiltros] = useState({
    numeroCliente: "",
    cuit: "",
    fechaDesde: "",
    fechaHasta: "",
    usuario: ""
  });

  // estado donde se guardan las notas que vienen del backend
  const [notasCredito, setNotasCredito] = useState([]);

  // 🔹 cuando la pantalla se carga llama al backend
  useEffect(() => {

    async function cargarNotas() {

      try {

        const response = await fetch("http://localhost:3001/notas");

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

  function handleBuscar() {

    console.log("Filtros aplicados:", filtros);

    // después podemos implementar filtros reales

  }

  function handleVer(id) {

    console.log("Ver detalle:", id);

  }

  function handleEditar(id) {

    console.log("Editar NC:", id);

  }

  return (

    <>
      <NavBar />

      <div className="consulta-container">

        <h2>Consulta de Notas de Crédito</h2>

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
            placeholder="Legajo Usuario"
            value={filtros.usuario}
            onChange={handleFiltroChange}
          />

          <button onClick={handleBuscar}>
            Buscar
          </button>

        </div>

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

            {notasCredito.map((nc) => (

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

                  <button onClick={() => handleEditar(nc.idNotaCredito)}>
                    Editar
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