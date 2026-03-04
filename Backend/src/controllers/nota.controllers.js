const db = require ("../db/models");

//GET 
const getNotas = async (req, res) => {
  try {
    const {legajo, admin} = req.query;
    let consulta = {};
    // si no vienen parámetros devolver todo
    if (legajo && admin !== "true") {
      consulta = {legajoUsuario: legajo};
    }
    const data = await db.NotaCredito.findAll({
      where: consulta,
      include: [
          { model: db.Usuario },
          { model: db.Empresa }
      ]
    });
    res.status(200).json(data);
  }catch(error) {
    res.status(500).json({
      message: "Error al obtener notas"
    });
  }
};

//GET BY ID
const getNotaById = async (req, res) => {
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

//POST
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

//PUT 
const updateNota = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      motivo,
      monto,
      nroFactura,
      estado,
      usuarioModificacion
    } = req.body;
    const nota = await db.NotaCredito.findByPk(id);
    if (!nota) {
      return res.status(404).json({
        message: "Nota de crédito no encontrada"
      });
    }
    await nota.update({
      motivo,
      monto,
      nroFactura,
      estado,
      usuarioModificacion
    });
    res.json({
      message: "Nota actualizada correctamente",
      nota
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la NC en nota.controllers.js",
      error: error.message
    });
  }
};

//DELETE
const deleteNota = async (req, res) => {
  try {
    const { id } = req.params;
    const nota = await db.NotaCredito.destroy({
      where: { idNotaCredito: id }
    });
    if (!nota) {
      return res.status(404).json({
        message: "Nota de crédito no encontrada"
      });
    }
    res.status(200).json({
      message: "Nota eliminada correctamente"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la nota"
    });
  }
};

module.exports = {getNotas, postNota, getNotaById, updateNota, deleteNota};