const { Router } = require("express");
const router = Router();

const userRoute = require("./user.route");
const notasRoute = require("./nota.route")
const empresasRoute = require("./empresa.route")

router.use("/user", userRoute);
router.use("/notas", notasRoute);
router.use("/empresas", empresasRoute)

module.exports = router;