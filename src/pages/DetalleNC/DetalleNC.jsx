import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "./DetalleNC.css";

function DetalleNC() {

  const { id } = useParams();

  const [modoEdicion, setModoEdicion] = useState(false);

  const [notaCredito, setNotaCredito] = useState(null);

  // Carga nota desde backend
  useEffect(() => {

    async function cargarNota() {

      try {

        const response = await fetch(`http://localhost:3001/notas/${id}`);

        const data = await response.json();

        setNotaCredito(data);

      } catch (error) {

        console.log("Error cargando la nota");

      }

    }

    cargarNota();

  }, [id]);



  function handleEditar() {

    setModoEdicion(true);

  }



  async function handleGuardar() {

    try {

      const response = await fetch(`http://localhost:3001/notas/${id}`, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          motivo: notaCredito.motivo,
          monto: Number(notaCredito.monto),
          estado: notaCredito.estado

        })

      });

      const data = await response.json();

      if (!response.ok) {

        alert(data.message);
        return;

      }

      alert("Nota actualizada");

      setModoEdicion(false);

    } catch (error) {

      alert("Error al actualizar la nota");

    }

  }



  function handleChange(e) {

    setNotaCredito({

      ...notaCredito,

      [e.target.name]: e.target.value

    });

  }



  if (!notaCredito) {

    return <p>Cargando...</p>;

  }



  return (

    <>

      <NavBar />

      <div className="detalle-container">

        <h2>Detalle Nota de Crédito</h2>

        <label>Razón Social</label>
        <input
          value={notaCredito.Empresa?.razonSocial}
          disabled
        />

        <label>Número Cliente</label>
        <input
          value={notaCredito.Empresa?.nroCliente}
          disabled
        />

        <label>CUIT</label>
        <input
          value={notaCredito.Empresa?.cuit}
          disabled
        />

        <label>Número SAP</label>
        <input
          value={notaCredito.Empresa?.nroSap}
          disabled
        />

        <label>Email Empresa</label>
        <input
          value={notaCredito.Empresa?.emailContacto}
          disabled
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
          <option value="aprobada">Aprobada</option>
          <option value="enProceso">En Proceso</option>
          <option value="rechazada">Rechazada</option>
        </select>

        <p>Fecha: {notaCredito.fechaCreacion}</p>

        <p>Usuario: {notaCredito.Usuario?.legajo}</p>

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