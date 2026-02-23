import { useState } from "react";
import "./AltaNC.css";

function AltaNotaCredito() {

  const [empresa, setEmpresa] = useState({
    razonSocial: "",
    numeroCliente: "",
    cuit: "",
    numeroSap: ""
  });

  const [motivo, setMotivo] = useState("");
  const [monto, setMonto] = useState("");
  const [archivo, setArchivo] = useState(null);

  const usuarioDemo = "Usuario 1234";
  const fechaActual = new Date().toLocaleDateString();

  // Base simulada de empresas
  const empresasMock = [
    {
      razonSocial: "Shell SA",
      numeroCliente: "1001",
      cuit: "30712345678",
      numeroSap: "SAP001"
    },
    {
      razonSocial: "YPF SRL",
      numeroCliente: "1002",
      cuit: "30798765432",
      numeroSap: "SAP002"
    }
  ];

  function buscarEmpresa(valor, campo) {

    const encontrada = empresasMock.find(
      (emp) => emp[campo] === valor
    );

    if (encontrada) {
      setEmpresa(encontrada);
    }
    else {
      setEmpresa({
        ...empresa,
        [campo]: valor
      });
    }
  }

  function handleGuardar(e) {
    e.preventDefault();

    const nuevaNC = {
      empresa,
      motivo,
      monto,
      archivo,
      estado: "Creada",
      fecha: fechaActual,
      usuario: usuarioDemo
    };

    console.log("NC creada:", nuevaNC);
    alert("Nota de crédito guardada");
  }

  return (
    <div className="alta-container">

      <h2>Alta Nota de Crédito</h2>

      <form onSubmit={handleGuardar}>

        <label>Razón Social</label>
        <input
          value={empresa.razonSocial}
          onChange={(e) =>
            buscarEmpresa(e.target.value, "razonSocial")
          }
        />

        <label>Número de Cliente</label>
        <input
          value={empresa.numeroCliente}
          onChange={(e) =>
            buscarEmpresa(e.target.value, "numeroCliente")
          }
        />

        <label>CUIT</label>
        <input
          value={empresa.cuit}
          onChange={(e) =>
            buscarEmpresa(e.target.value, "cuit")
          }
        />

        <label>Número SAP</label>
        <input
          value={empresa.numeroSap}
          readOnly
        />

        <label>Motivo</label>
        <textarea
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />

        <label>Monto</label>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />

        <label>Adjuntar archivo</label>
        <input
          type="file"
          onChange={(e) => setArchivo(e.target.files[0])}
        />

        <p>Estado: Creada</p>
        <p>Fecha: {fechaActual}</p>
        <p>Usuario: {usuarioDemo}</p>

        <button type="submit">
          Guardar
        </button>

      </form>

    </div>
  );
}

export default AltaNotaCredito;