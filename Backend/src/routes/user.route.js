const { Router } = require("express");
const router = Router();

const { userController } = require("../controllers/index");

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios del sistema
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtener todos los usuarios registrados
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", userController.getUsers);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Loguear un usuario existente en la base
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               legajo:
 *                 type: integer
 *                 example: 501169
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "5555"
 *     responses:
 *       200:
 *         description: Usuario autentificado correctamente
 *       401:
 *         description: Credenciales inválidas (legajo o contraseña incorrectos)
 */
router.post("/login", userController.login);

router.post("/register", userController.crearUsuario); // Esta es la URL: http://localhost:3001/user/register

module.exports = router;