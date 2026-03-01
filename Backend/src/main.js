const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

const db = require("./db/models");
const routes = require("./routes");

// Middlewares
app.use(cors());
app.use(express.json());
app.set("json spaces", 2);

// Rutas
app.use(routes);

// Servidor
app.listen(PORT, async () => {
  console.log(`La app arrancó en el puerto ${PORT}`);
  //await db.sequelize.sync({ force: true });
  await db.sequelize.sync();
});