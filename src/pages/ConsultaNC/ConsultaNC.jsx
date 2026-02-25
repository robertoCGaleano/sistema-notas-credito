import { useState } from "react";
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

  // datos simulados 
  const [notasCredito] = useState([
    {
      id: 1,
      razonSocial: "Shell SA",
      numeroCliente: "1001",
      cuit: "30712345678",
      monto: 50000,
      estado: "Creada",
      fecha: "20/02/2026",
      usuario: "1234"
    },
    {
      id: 2,
      razonSocial: "YPF SRL",
      numeroCliente: "1002",
      cuit: "30798765432",
      monto: 120000,
      estado: "En Proceso",
      fecha: "18/02/2026",
      usuario: "5678"
    }
  ]);

  function handleFiltroChange(e) {

    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });

  }

  function handleBuscar() {

    console.log("Filtros:", filtros);

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

              <tr key={nc.id}>

                <td>{nc.razonSocial}</td>
                <td>{nc.numeroCliente}</td>
                <td>{nc.cuit}</td>
                <td>${nc.monto}</td>
                <td>{nc.estado}</td>
                <td>{nc.fecha}</td>
                <td>{nc.usuario}</td>

                <td>

                  <button onClick={() => handleVer(nc.id)}>
                    Ver
                  </button>

                  <button onClick={() => handleEditar(nc.id)}>
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