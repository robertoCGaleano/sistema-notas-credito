const { Router } = require("express");
const router = Router();

const userRoute = require("./user.route");
const notasRoute = require("./nota.route")

router.use("/user", userRoute);
router.use("/notas", notasRoute);

module.exports = router;