const { Router } = require("express");
const router = Router();

const { getUsers } = require("../controllers/user.controllers");

router.get("/", getUsers);

module.exports = router;