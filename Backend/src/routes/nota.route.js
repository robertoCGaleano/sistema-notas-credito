const { Router } = require("express");
const router = Router();

const { notaController } = require("../controllers");

router.get("/", notaController.getNotas);

router.get("/:id", notaController.getNotaById);

router.post("/", notaController.postNota);

router.put("/:id", notaController.updateNota);

router.delete("/:id", notaController.deleteNota);

module.exports = router;