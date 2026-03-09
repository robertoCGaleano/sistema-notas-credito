# Sistema Web de Gestión de Notas de Crédito

Aplicación web desarrollada para la gestión de **Notas de Crédito**, permitiendo registrar, consultar, modificar y eliminar registros asociados a empresas y usuarios.

Proyecto académico desarrollado en la **Universidad Nacional de Hurlingham**.

---

# Tecnologías utilizadas

## Backend
- Node.js
- Express
- Sequelize
- SQLite

## Frontend
- React
- Vite

## Testing y documentación
- Postman
- Swagger

---

# Arquitectura del proyecto

Backend

data  
 └ data.db  

src  

controllers  
 ├ empresa.controller.js  
 ├ nota.controller.js  
 ├ user.controller.js  
 └ index.js  

db  

models  

routes  
 ├ empresa.route.js  
 ├ nota.route.js  
 ├ user.route.js  
 └ index.js  

main.js  

Frontend  

src  

components  
 └ NavBar  

pages  
 ├ AltaNC  
 ├ ConsultaNC  
 ├ DetalleNC  
 ├ Empresas  
 └ Login  

router  
 └ AppRouter.jsx  

styles  
 └ global.css  

main.jsx  

---

# Instalación del proyecto

Clonar repositorio

    git clone https://github.com/robertoCGaleano/sistema-notas-credito.git

Entrar al proyecto

    cd sistema-notas-credito

---

# Ejecutar Frontend

    npm install

Iniciar servidor de desarrollo

    npm run dev

El frontend se ejecuta en:

http://localhost:5173

---

# Ejecutar Backend

Abrir otra terminal y entrar a la carpeta backend

    cd Backend

Instalar dependencias

    npm install

Iniciar servidor

    npm run dev

El backend se ejecuta en:

http://localhost:3001

---

# Documentación de API

La API se encuentra documentada con Swagger.

Acceder a la documentación en:

http://localhost:3001/api-docs

Desde Swagger es posible:

- visualizar endpoints
- enviar requests
- probar respuestas de la API

---

# Endpoints principales

## Usuarios

- POST /user/login  
- POST /user  
- GET /user  

## Empresas

- POST /empresas  
- GET /empresas  
- GET /empresas/:id  

## Notas de crédito

- GET /notas  
- GET /notas/:id  
- POST /notas  
- PUT /notas/:id  
- DELETE /notas/:id  

---

# Funcionalidades

- Autenticación de usuarios
- Registro de empresas
- Creación de notas de crédito
- Consulta de notas de crédito
- Modificación de registros
- Eliminación de registros

---

# Autor

Roberto Galeano  
Universidad Nacional de Hurlingham  
2026