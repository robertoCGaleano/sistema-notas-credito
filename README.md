# Sistema Web de Gestión de Notas de Crédito

Aplicación web desarrollada para la gestión de **Notas de Crédito**, permitiendo registrar, consultar, modificar y eliminar registros asociados a empresas y usuarios.

Proyecto realizado como trabajo académico.

---

## Tecnologías utilizadas

### Backend
- Node.js
- Express
- Sequelize
- SQLite

### Frontend
- React
- Vite

### Documentación y Testing
- Postman
- Swagger

---

## Arquitectura del proyecto

Backend

controllers  
routes  
models  
database  

Frontend

components  
pages  
services  

---

## Instalación

Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/TU-REPO.git

Instalar dependencias
npm install

Ejecutar el servidor
npm start

El backend corre en:
http://localhost:3001

Documentación de la API
La API está documentada con Swagger.

Acceder en:
http://localhost:3001/api-docs

Desde Swagger se pueden:

visualizar endpoints

enviar requests

probar respuestas del backend

Endpoints principales

Usuarios
POST /user/login
POST /user
GET /user

Empresas
POST /empresas
GET /empresas
GET /empresas/:id

Notas de crédito
GET /notas
GET /notas/:id
POST /notas
PUT /notas/:id
DELETE /notas/:id

Funcionalidades
Login de usuarios
Registro de empresas
Creación de notas de crédito
Consulta de notas
Modificación de notas
Eliminación de registros

Autor
Roberto Galeano
Universidad Nacional de Hurlingham
2026
