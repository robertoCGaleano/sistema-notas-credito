const db = require ("../db/models");

const getUsers = async (req, res) => {
    const data = await db.Usuario.findAll({})
    res.status(200).json(data);
};

module.exports = {getUsers};