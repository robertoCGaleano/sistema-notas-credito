const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const db = require("./db/models");
const routes = require("./routes");

app.use(express.json());
app.set("json spaces", 2);
app.use(routes);

app.listen(PORT, async () => {
  console.log(`La app arranco en el puerto ${PORT}`);
  await db.sequelize.sync({ force: true });
});