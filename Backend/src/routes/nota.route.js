const { Router } = require("express");
const router = Router();

const { getNotas } = require("../controllers/nota.controllers");

router.get("/", getNotas);

module.exports = router;