const { Router } = require("express");
const router = Router();

const { userController } = require("../controllers");

router.get("/", userController.getUsers);

router.post("/login", userController.login);

module.exports = router;