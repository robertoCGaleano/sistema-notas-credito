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

module.exports = {getNotas};