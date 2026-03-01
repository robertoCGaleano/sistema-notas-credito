const { Router } = require("express");
const router = Router();

const { getNotas, postNota } = require("../controllers/nota.controllers");

router.get("/", getNotas);

router.post("/", postNota);

module.exports = router;