import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "./AltaNC.css";

function AltaNotaCredito() {

  const navigate = useNavigate();

  const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  useEffect(() => {
    if (!usuarioGuardado) {
      navigate("/");
    }
  }, [usuarioGuardado, navigate]);

  const [empresa, setEmpresa] = useState({
    razonSocial: "",
    numeroCliente: "",
    cuit: "",
    numeroSap: ""
  });

  const [motivo, setMotivo] = useState("");
  const [monto, setMonto] = useState("");
  const [nroFactura, setNroFactura] = useState("");
  const [archivo, setArchivo] = useState(null);

  const fechaActual = new Date().toLocaleDateString();

  // mock temporal
  const empresasMock = [
    {
      razonSocial: "Shell",
      numeroCliente: "1000",
      cuit: "201112223334",
      numeroSap: "SAP100"
    },
    {
      razonSocial: "YPF",
      numeroCliente: "1001",
      cuit: "201112223335",
      numeroSap: "SAP101"
    },
    {
      razonSocial: "Axion",
      numeroCliente: "1002",
      cuit: "201112223336",
      numeroSap: "SAP102"
    }
  ];

 function autocompletarEmpresa(valor, campo) {

  const encontrada = empresasMock.find(
    (emp) => emp[campo] === valor
  );

  if (encontrada) {
    setEmpresa(encontrada);
  }
}

  async function handleGuardar(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/notas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fechaCreacion: new Date(),
          motivo,
          monto: Number(monto),
          nroFactura: Number(nroFactura),
          estado: "enProceso",
          legajoUsuario: usuarioGuardado.legajo,
          nroCliente: Number(empresa.numeroCliente)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Nota de crédito creada correctamente");

    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  }

  return (
    <>
      <NavBar />

      <div className="alta-container">
        <h2>Alta Nota de Crédito</h2>

        <form onSubmit={handleGuardar}>

          <label>Razón Social</label>
          <input
            value={empresa.razonSocial}
            onChange={(e) =>
              setEmpresa({
                ...empresa,
                razonSocial: e.target.value
              })
            }
            onBlur={(e) =>
              autocompletarEmpresa(e.target.value, "razonSocial")
            }
          />

          <label>Número de Cliente</label>
          <input
            value={empresa.numeroCliente}
            onChange={(e) =>
              setEmpresa({
                ...empresa,
                numeroCliente: e.target.value
              })
            }
            onBlur={(e) =>
              autocompletarEmpresa(e.target.value, "numeroCliente")
            }
          />
          <label>CUIT</label>
          <input
            value={empresa.cuit}
            onChange={(e) =>
              setEmpresa({
                ...empresa,
                cuit: e.target.value
              })
            }
            onBlur={(e) =>
              autocompletarEmpresa(e.target.value, "cuit")
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

          <label>Nro. Factura</label>
          <input
            type="number"
            value={nroFactura}
            onChange={(e) => setNroFactura(e.target.value)}
          />

          <label>Adjuntar archivo</label>
          <input
            type="file"
            onChange={(e) => setArchivo(e.target.files[0])}
          />

          <p>Estado: En Proceso</p>
          <p>Fecha: {fechaActual}</p>
          <p>Usuario: {usuarioGuardado?.legajo}</p>

          <button type="submit">
            Guardar
          </button>

        </form>
      </div>
    </>
  );
}

export default AltaNotaCredito;