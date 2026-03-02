const db = require ("../db/models");

const getNotas = async (req, res) => {
  const data = await db.NotaCredito.findAll({
      include: [
          { model: db.Usuario },
          { model: db.Empresa }
      ]
  });
  res.status(200).json(data);
};

const getNotaById = async (req, res) => {
  //const NotaCredito = db.NotaCredito;
  //const Usuario = db.Usuario;
  //const Empresa = db.Empresa;
  try {
    const {id} = req.params;
    const nota = await db.NotaCredito.findByPk(id, {
      include: [db.Usuario, db.Empresa]
    });
    if (!nota) {
      return res.status(404).json({
        message: "Nota de credito no encontrada"
      });
    }
    res.json(nota);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la NC",
      error: error.message
    });
  }
};

const postNota = async (req, res) => {
  try {
    const {
      fechaCreacion,
      motivo,
      monto,
      nroFactura,
      estado,
      legajoUsuario,
      nroCliente
    } = req.body;
    const nuevaNota = await db.NotaCredito.create({
      fechaCreacion,
      motivo,
      monto,
      nroFactura,
      estado,
      legajoUsuario,
      nroCliente
    });
    res.status(201).json(nuevaNota);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la nota" });
  }
};

module.exports = {getNotas, postNota, getNotaById};