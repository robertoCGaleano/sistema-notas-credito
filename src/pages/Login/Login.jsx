import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!usuario || !password) {
    setError("Debe completar usuario y contraseña");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/user/login", {
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

    navigate("/altaNC");

  } catch (error) {
    setError("Error de conexión con el servidor");
  }
};

const handleCrearUsuario = () => {
  navigate("/crearUsuario");
};

  return (

    <div className="login-container">

      <div className="login-box">

        <h2 className="login-title">SGNC</h2>
        <p className="login-subtitle">Sistema de Gestión de Notas de Crédito</p>

        <form onSubmit={handleLogin}>

          <div className="login-field">
            <label>Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

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
            Ingresar
          </button>

        </form>

        <div className="login-footer">

          <button
            className="crear-usuario-button"
            onClick={handleCrearUsuario}
          >
            Crear usuario
          </button>

        </div>

      </div>

    </div>

  );
};

export default Login;
