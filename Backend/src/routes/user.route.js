const { Router } = require("express");
const router = Router();

const { getUsers, login } = require("../controllers/user.controllers");

router.get("/", getUsers);

router.post("/login", login);

module.exports = router;