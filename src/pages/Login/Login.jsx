import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //Variables agregadas para crear un usuario nuevo como admin:false 
  //Para que un usuario pueda ser admin:true se debe hacer directamente en la BD.
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [esRegistro, setEsRegistro] = useState(false); // Switch para modo Registro

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!usuario || !password) {
    setError("Debe completar usuario y contraseña");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/user/login", {
    //const response = await fetch("https://r1kp8skz-3001.brs.devtunnels.ms/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        legajo: Number(usuario),
        password: password
      })
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
      return;
    } 
    localStorage.setItem("usuarioLogueado", JSON.stringify(data.user));
    navigate("/altaNC");
  }
    catch (error) {
    setError("Error de conexión con el servidor");
  }
};

const handleCrearUsuario = async (e) => {
  if (e) e.preventDefault();

  //Validación 
  if (!usuario || !password || !nombre || !email) {
    setError("Todos los campos deben estar completos para el registro");
    return;
  }
  try {
    const response = await fetch("http://localhost:3001/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        legajo: Number(usuario), 
        password: password,
        nombre: nombre,
        email: email,
        admin: false 
      })
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.message || "Error al crear usuario");
      return; 
    }
    alert("Usuario creado correctamente");
    // Limpiar campos
    setNombre("");
    setEmail("");
    setUsuario("");
    setPassword("");
    setError(""); 
    setEsRegistro(false);

  } catch (err) {
    setError("Error de conexión con el servidor");
  }
};

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">SGNC</h2>
        <p className="login-subtitle">
          {esRegistro ? "Registro de Nuevo Usuario" : "Sistema de Gestión de Notas de Crédito"}
        </p>
        <form onSubmit={esRegistro ? handleCrearUsuario : handleLogin}>

          <div className="login-field">
            <label>Legajo de Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          {/* Campo Nombre solo en modo registro*/}
          {esRegistro && (
            <>
              <div className="login-field">
                <label>Nombre y Apellido</label>
                <input 
                  type="text" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)} 
                />
              </div>

              {/* Campo Email solo en modo registro*/}
              <div className="login-field">
                <label>Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
            </>
          )}
          
          <div className="login-field">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button className="login-button" type="submit">
            {esRegistro ? "Registrarme" : "Ingresar"}
          </button>

        </form>

        <div className="login-footer">

          <button
            className="crear-usuario-button"
            onClick={() => {
              setEsRegistro(!esRegistro);
              setError(""); 
            }}
          >
            {esRegistro ? "¿Ya tenés cuenta? Ingresá acá" : "¿No tenés cuenta? Creala aquí"}
          </button>

        </div>

      </div>

    </div>

  );
};

export default Login;
