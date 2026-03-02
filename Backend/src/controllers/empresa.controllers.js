const db = require("../db/models");

const getEmpresas = async (req, res) => {
  const empresas = await db.Empresa.findAll();

  res.status(200).json(empresas);
};

module.exports = { getEmpresas };