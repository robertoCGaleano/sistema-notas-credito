# Sistema Web de Gestión de Notas de Crédito (SGNC)

### Origen e Inspiración del Proyecto
Este es mi proyecto integrador para la Tecnicatura en Programación (UNAHUR). Nació de observar un problema operativo real en los equipos de atención al cliente (Customer Service): la gestión manual de notas de crédito mediante planillas Excel y comentarios de texto sueltos. Esto genera pérdida de información histórica, errores manuales y falta de trazabilidad. Tomé este escenario laboral como caso de estudio académico para diseñar y desarrollar una solución de software de punta a punta.

---

### Ingeniería de Requerimientos y Análisis Funcional
Antes de escribir el código, apliqué metodologías de Ingeniería de Requerimientos para modelar la lógica del negocio. La documentación completa (BRD y FRD) se encuentra estructurada bajo las siguientes definiciones clave:

* **9 Reglas de Negocio (RN) Críticas Implementadas:**
  * **RN-01 / RN-02:** Toda nota de crédito debe estar asociada obligatoriamente a un usuario logueado y a una empresa.
  * **RN-03 / RN-04:** El CUIT y el número de cliente de la empresa deben ser únicos en la base de datos.
  * **RN-07:** Control estricto del ciclo de vida del documento mediante estados: *Creada, En Proceso, Anulada*.
  * **RN-08:** Validación en el backend para asegurar que el monto de la Nota de Crédito sea mayor a cero.
* **Historias de Usuario (User Stories):** Relevamiento detallado con criterios de aceptación precisos para los módulos de Autenticación, Creación, Consulta avanzada por filtros y Modificación de registros.

---

### Vista previa del Sistema

![Pantalla de Login](img/Login.png)
*Interfaz de acceso para los usuarios operativos del sistema.*

![Consulta de Notas de Crédito](img/ConsultaDeNC.png)
*Módulo de búsqueda avanzada por filtros múltiples y control de estados.*

---

### Tecnologías Utilizadas

* **Backend:** Node.js, Express, Sequelize (ORM)
* **Base de Datos:** SQLite (Implementada para centralizar la persistencia de datos y eliminar el uso de archivos Excel)
* **Frontend:** React, Vite, CSS Global
* **Testing y Documentación:** Postman, Swagger UI

---

### Arquitectura del Proyecto

#### Backend
```text
data
└ data.db

src
├── controllers
│   ├ empresa.controller.js
│   ├ nota.controller.js
│   └ user.controller.js
├── db
├── models
├── routes
│   ├ empresa.route.js
│   ├ nota.route.js
│   ├ user.route.js
│   └ index.js
└── main.js
```

#### Frontend
```text
src
├── components
│   └ NavBar
├── pages
│   ├ AltaNC
│   ├ ConsultaNC
│   ├ DetalleNC
│   ├ Empresas
│   └ Login
├── router
│   └ AppRouter.jsx
└── styles
    └ global.css
```

---

### Instalación y Ejecución Local

#### 1. Clonar el repositorio
```bash
git clone https://github.com/robertoCGaleano/sistema-notas-credito.git
cd sistema-notas-credito
```

#### 2. Ejecutar el Frontend
```bash
npm install
npm run dev
```
El frontend se ejecutará en: `http://localhost:5173`

#### 3. Ejecutar el Backend
Abra otra terminal y entre a la carpeta del servidor:
```bash
cd Backend
npm install
npm run dev
```
El backend se ejecutará en: `http://localhost:3001`

---

### Documentación de la API (Swagger)
La API cuenta con documentación interactiva mediante Swagger UI. Una vez levantado el backend, puede acceder en:
`http://localhost:3001/api-docs`

Desde la interfaz de Swagger es posible visualizar la estructura de los endpoints, realizar peticiones de prueba en tiempo real y verificar el manejo de respuestas y códigos de estado HTTP.

#### Endpoints Principales:
* **Usuarios:** `POST /user/login` | `POST /user` | `GET /user`
* **Empresas:** `POST /empresas` | `GET /empresas` | `GET /empresas/:id`
* **Notas de Crédito:** `GET /notas` | `GET /notas/:id` | `POST /notas` | `PUT /notas/:id` | `DELETE /notas/:id`

---

### Autor
* **Roberto Galeano** - Técnico en Programación - Universidad Nacional de Hurlingham (2026)
