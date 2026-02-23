import "./Login.css"
import { useNavigate } from "react-router-dom"


function Login() {

  const navigate = useNavigate()

  const handleLogin = (event) => {

    event.preventDefault()

    const legajo = event.target.legajo.value
    const password = event.target.password.value

    if (legajo === "1234" && password === "1234") {
      alert("Login correcto")
      navigate("/alta-nota")
    } else {
      alert("Legajo o contraseña incorrectos")
    }

  }

  return (

  <div className="login-container">

    <form onSubmit={handleLogin} className="login-form">

      <h2 className="login-title">
        Sistema Notas de Crédito
      </h2>

      <label>Legajo</label>
      <input name="legajo" type="number" required className="login-input" />

      <label>Contraseña</label>
      <input name="password" type="password" required className="login-input" />

      <button type="submit" className="login-button">
        Ingresar
      </button>

      <p className="login-link">
        ¿No tenés usuario? <a href="#">Crear usuario</a>
      </p>

    </form>

  </div>

)

}

export default Login
