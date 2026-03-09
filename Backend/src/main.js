const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 3001;

const db = require("./db/models");
const routes = require("./routes");

// Swagger config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Sistema de Gestión de Notas de Crédito",
      version: "1.0.0",
      description: "Documentación de los endpoint de la API",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: [__dirname + "/routes/*.route.js"],
};
const specs = swaggerJsdoc(options);

// Middlewares
app.use(cors());
app.use(express.json());
app.set("json spaces", 2);

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Rutas
app.use(routes);

// Servidor
app.listen(PORT, async () => {
  console.log(`La app arrancó en el puerto ${PORT}`);
  //await db.sequelize.sync({ force: true });
  await db.sequelize.sync();
});