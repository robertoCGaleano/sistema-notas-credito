const { Router } = require("express");
const router = Router();

const {getEmpresas, getEmpresaById, postEmpresa, deleteEmpresa} = require("../controllers/empresa.controllers");

router.get("/", getEmpresas);

router.get("/:nroCliente", getEmpresaById);

router.post("/", postEmpresa);

router.delete("/:nroCliente", deleteEmpresa);

module.exports = router;