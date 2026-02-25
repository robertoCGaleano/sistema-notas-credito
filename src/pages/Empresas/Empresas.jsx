import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Empresas.css";

function Empresas() {

  // estado que guarda los datos del formulario
  const [empresa, setEmpresa] = useState({

    razonSocial: "",
    cuit: "",
    numeroCliente: "",
    numeroSap: "",
    email: ""

  });

  function handleChange(e) {

    setEmpresa({
      ...empresa,
      [e.target.name]: e.target.value
    });

  }

  function handleGuardar(e) {

    e.preventDefault();

    console.log("Empresa guardada:", empresa);

    alert("Empresa creada correctamente");

    // limpiar formulario
    setEmpresa({
      razonSocial: "",
      cuit: "",
      numeroCliente: "",
      numeroSap: "",
      email: ""
    });

  }

  return (

    <>
      <NavBar />

      <div className="empresas-container">

        <h2>Gestión de Empresas</h2>

        <form onSubmit={handleGuardar}>

          <label>Razón Social</label>
          <input
            name="razonSocial"
            value={empresa.razonSocial}
            onChange={handleChange}
            required
          />

          <label>CUIT</label>
          <input
            name="cuit"
            value={empresa.cuit}
            onChange={handleChange}
            required
          />

          <label>Número de Cliente</label>
          <input
            name="numeroCliente"
            value={empresa.numeroCliente}
            onChange={handleChange}
            required
          />

          <label>Número SAP</label>
          <input
            name="numeroSap"
            value={empresa.numeroSap}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            value={empresa.email}
            onChange={handleChange}
          />

          <button type="submit">
            Crear Empresa
          </button>

        </form>

      </div>

    </>

  );

}

export default Empresas;