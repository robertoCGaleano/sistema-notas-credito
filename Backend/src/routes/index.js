const { Router } = require("express");
const router = Router();

const userRoute = require("./user.route");
// después agregaremos notas.router

router.use("/user", userRoute);
// router.use("/notas", notasRoute);

module.exports = router;