import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./DetalleNC.css";

function DetalleNC() {

  // estado que controla si se puede editar
  const [modoEdicion, setModoEdicion] = useState(false);

  // datos simulados 
  const [notaCredito, setNotaCredito] = useState({

    razonSocial: "Shell SA",
    numeroCliente: "1001",
    cuit: "30712345678",
    numeroSap: "SAP001",
    motivo: "Error en facturación",
    monto: 50000,
    estado: "Creada",
    fecha: "20/02/2026",
    usuario: "1234",
    emailEmpresa: "contacto@shell.com",
    archivo: "archivo.pdf"

  });

  function handleEditar() {

    setModoEdicion(true);

  }

  function handleGuardar() {

    setModoEdicion(false);

    console.log("NC actualizada:", notaCredito);

    alert("Cambios guardados");

  }

  function handleChange(e) {

    setNotaCredito({
      ...notaCredito,
      [e.target.name]: e.target.value
    });

  }

  return (

    <>
      <NavBar />

      <div className="detalle-container">

        <h2>Detalle Nota de Crédito</h2>

        <label>Razón Social</label>
        <input
          name="razonSocial"
          value={notaCredito.razonSocial}
          onChange={handleChange}
          disabled={!modoEdicion}
        />

        <label>Número Cliente</label>
        <input
          name="numeroCliente"
          value={notaCredito.numeroCliente}
          disabled
        />

        <label>CUIT</label>
        <input
          name="cuit"
          value={notaCredito.cuit}
          disabled
        />

        <label>Número SAP</label>
        <input
          name="numeroSap"
          value={notaCredito.numeroSap}
          disabled
        />

        <label>Email Empresa</label>
        <input
          name="emailEmpresa"
          value={notaCredito.emailEmpresa}
          disabled={!modoEdicion}
          onChange={handleChange}
        />

        <label>Motivo</label>
        <textarea
          name="motivo"
          value={notaCredito.motivo}
          disabled={!modoEdicion}
          onChange={handleChange}
        />

        <label>Monto</label>
        <input
          name="monto"
          type="number"
          value={notaCredito.monto}
          disabled={!modoEdicion}
          onChange={handleChange}
        />

        <label>Estado</label>
        <select
          name="estado"
          value={notaCredito.estado}
          disabled={!modoEdicion}
          onChange={handleChange}
        >
          <option>Creada</option>
          <option>En Proceso</option>
          <option>Anulada</option>
        </select>

        <label>Archivo adjunto</label>
        <p className="archivo-link">
          {notaCredito.archivo}
        </p>

        <p>Fecha: {notaCredito.fecha}</p>

        <p>Usuario: {notaCredito.usuario}</p>

        <div className="botones">

          {!modoEdicion && (
            <button onClick={handleEditar}>
              Editar
            </button>
          )}

          {modoEdicion && (
            <button onClick={handleGuardar}>
              Guardar
            </button>
          )}

        </div>

      </div>

    </>

  );

}

export default DetalleNC;