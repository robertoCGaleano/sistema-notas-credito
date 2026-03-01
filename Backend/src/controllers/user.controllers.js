const db = require ("../db/models");

const getUsers = async (req, res) => {
    const data = await db.Usuario.findAll({})
    res.status(200).json(data);
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

module.exports = {getUsers, login};