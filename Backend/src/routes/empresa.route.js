const { Router } = require("express");
const router = Router();

const {getEmpresas} = require("../controllers/empresa.controllers");

router.get("/", getEmpresas);

//router.post("/", postEmpresas);

module.exports = router;