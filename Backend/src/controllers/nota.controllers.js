const db = require ("../db/models");

const getNotas = async (req, res) => {
    const data = await db.NotaCredito.findAll({
        include: [
            {
                model: db.Usuario
            },
            {
                model: db.Empresa
            }
        ]
    });

    res.status(200).json(data);
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

module.exports = {getNotas, postNota};