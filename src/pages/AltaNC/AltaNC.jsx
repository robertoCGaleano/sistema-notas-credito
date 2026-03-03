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

  const [empresas, setEmpresas] = useState([]);

  const [motivo, setMotivo] = useState("");
  const [monto, setMonto] = useState("");
  const [nroFactura, setNroFactura] = useState("");
  const [archivo, setArchivo] = useState(null);

  const fechaActual = new Date().toLocaleDateString();

  // CARGA EMPRESAS DESDE BACKEND
  useEffect(() => {

    async function cargarEmpresas() {

      try {

        const response = await fetch("http://localhost:3001/empresas");

        const data = await response.json();

        setEmpresas(data);

      } catch (error) {

        console.log("Error cargando empresas");

      }

    }

    cargarEmpresas();

  }, []);

  // AUTOCOMPLETA EMPRESA
  function autocompletarEmpresa(valor, campo) {

    const encontrada = empresas.find(
      (emp) => String(emp[campo]) === String(valor)
    );

    if (encontrada) {

      setEmpresa({
        razonSocial: encontrada.razonSocial,
        numeroCliente: encontrada.nroCliente,
        cuit: encontrada.cuit,
        numeroSap: encontrada.nroSap
      });

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

      // limpia formulario
      setMotivo("");
      setMonto("");
      setNroFactura("");
      setEmpresa({
        razonSocial: "",
        numeroCliente: "",
        cuit: "",
        numeroSap: ""
      });

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
              autocompletarEmpresa(e.target.value, "nroCliente")
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