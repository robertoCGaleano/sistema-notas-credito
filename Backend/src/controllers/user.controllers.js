const db = require ("../db/models");

const getUsers = async (req, res) => {
    const data = await db.Usuario.findAll({})
    res.status(200).json({
      message: "Listado de usuarios registrados",
      data
    });
};

const login = async (req, res) => {
  const { legajo, password } = req.body;
  try {
    const user = await db.Usuario.findOne({
      where: { legajo }
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    res.status(200).json({
      message: "Login correcto",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

//POST NUEVO USER
const crearUsuario = async (req, res) => {
  try {
    const { legajo, nombre, email, password, admin } = req.body;
    // Validación luego crear middleware
    if (!legajo || !nombre || !email || !password) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }
    const nuevoUsuario = await db.Usuario.create({
      legajo,
      nombre,
      email,
      password, 
      admin: false 
    });

    res.status(201).json({ message: "Usuario creado con éxito", user: nuevoUsuario });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError") {
      return res.status(400).json({ message: error.errors[0].message });
    }
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {getUsers, login, crearUsuario};