import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Empresas.css";

function Empresas() {

  // estado que guarda los datos del formulario
  const [empresa, setEmpresa] = useState({
    razonSocial: "",
    cuit: "",
    nroCliente: "",
    nroSap: "",
    emailContacto: ""
  });

  const [empresas, setEmpresas] = useState([]);

  function handleChange(e) {

    setEmpresa({
      ...empresa,
      [e.target.name]: e.target.value
    });

  }

  async function handleGuardar(e) {
    e.preventDefault();
    console.log("Empresa a guardar:", empresa);
    try {
      const response = await fetch("http://localhost:3001/empresas", {
      //const response = await fetch("https://r1kp8skz-3001.brs.devtunnels.ms/empresas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(empresa)
      })
      const data = await response.json()
      if (!response.ok) {
        alert(data.message)
        return;
      }
      alert("Empresa creada correctamente, ya puedes usarla para generar una NC");
      obtenerEmpresas()
    
      // limpia formulario
      setEmpresa({
        razonSocial: "",
        cuit: "",
        nroCliente: "",
        nroSap: "",
        emailContacto: ""
      });

    }catch (error) {
      console.error("Error de red:", error);
      alert("Error al conectar con el servidor")
    }
  }

  async function obtenerEmpresas() {
    try {
      const response = await fetch("http://localhost:3001/empresas")
      //const response = await fetch("https://r1kp8skz-3001.brs.devtunnels.ms/empresas")
      const data = await response.json()
      setEmpresas(data)
    } catch (error) {
      console.error("Error cargando empresas:", error)
    }
  }
  //Get/empresas
  useEffect(() => {
    obtenerEmpresas()
  }, [])

  const eliminarEmpresa = async (nroCliente) => {
  if (!window.confirm("¿Desea eliminar la empresa?")) {
    return;
  }
  try {
    const response = await fetch(
      `http://localhost:3001/empresas/${nroCliente}`,
      //`https://r1kp8skz-3001.brs.devtunnels.ms/empresas/${nroCliente}`,
      {
        method: "DELETE"
      }
    );
    if (response.ok) {
      alert("Empresa eliminada correctamente");
      obtenerEmpresas();
    }
  } catch (error) {
    console.error(error);
  }

};
  
  return (

    <>
      <NavBar />

      <div className="empresas-container">

        <h2 className="titulo">Gestión de Empresas</h2>

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
            name="nroCliente"
            value={empresa.nroCliente}
            onChange={handleChange}
            required
          />

          <label>Número SAP</label>
          <input
            name="nroSap"
            value={empresa.nroSap}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            name="emailContacto"
            type="email"
            value={empresa.emailContacto}
            onChange={handleChange}
          />

          <button type="submit">
            Crear Empresa
          </button>

        </form>

      </div>
      <div className="empresas-container">
        <h3>Empresas registradas</h3>
        <table>
          <thead>
            <tr>
              <th>Nro Cliente</th>
              <th>Razón Social</th>
              <th>CUIT</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((emp) => (
              <tr key={emp.nroCliente}>
                <td>{emp.nroCliente}</td>
                <td>{emp.razonSocial}</td>
                <td>{emp.cuit}</td>
                <td>
                  <button className="btn-eliminar" onClick={() => eliminarEmpresa(emp.nroCliente)}>
                    🗑 Eliminar
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

export default Empresas;