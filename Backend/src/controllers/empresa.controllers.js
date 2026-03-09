const db = require("../db/models");

// GET
const getEmpresas = async (req, res) => {
  const empresas = await db.Empresa.findAll();

  res.status(200).json(empresas);
};

// GET BY ID
const getEmpresaById = async (req, res) => {
  try {
    const { nroCliente } = req.params;
    const empresa = await db.Empresa.findByPk(nroCliente);
    if (!empresa) {
      return res.status(404).json({
        message: "Empresa no encontrada"
      });
    }
    res.json(empresa);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener empresa"
    });
  }
};

//POST
const postEmpresa = async (req, res) => {
  try {
    const { razonSocial, cuit, nroCliente, nroSap, emailContacto } = req.body;
    
    const nuevaEmpresa = await db.Empresa.create({
      razonSocial,
      cuit,
      nroCliente,
      nroSap,
      emailContacto,
    });
    res.status(201).json({
      message: "Empresa nueva creada con éxito en la base",
      data: nuevaEmpresa
    });
  } catch (error) {
    console.error(error);

    // Por si el error es de validación o de campo único.
    if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: error.errors[0].message // mensajes definidos en el modelo
      });
    }

    res.status(500).json({ message: "Error al crear la Empresa" });
  }
};

//DELETE
const deleteEmpresa = async (req, res) => {
  try {
    const { nroCliente } = req.params;
    const empresaEliminada = await db.Empresa.destroy({
      where: { nroCliente }
    });
    if (!empresaEliminada) {
      return res.status(404).json({
        message: "Empresa no encontrada"
      });
    }
    res.json({
      message: "Empresa eliminada correctamente"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar empresa"
    });
  }
};

module.exports = { getEmpresas, postEmpresa, deleteEmpresa, getEmpresaById };