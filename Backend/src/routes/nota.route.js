const { Router } = require("express");
const router = Router();

const { notaController } = require("../controllers");

/**
 * @swagger
 * /notas:
 *   get:
 *     summary: Obtener todas las notas de crédito
 *     tags: [Notas]
 *     responses:
 *       200:
 *         description: Lista de notas
 */
router.get("/", notaController.getNotas);

/**
 * @swagger
 * /notas/{id}:
 *   get:
 *     summary: Obtener una nota de crédito por ID
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la nota
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nota encontrada
 *       404:
 *         description: Nota no encontrada
 */
router.get("/:id", notaController.getNotaById);

/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Crear una nota de crédito
 *     tags: [Notas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaCreacion:
 *                 type: string
 *                 format: date
 *                 example: 2026-03-08
 *               motivo:
 *                 type: string
 *                 example: Devolución de producto
 *               monto:
 *                 type: integer
 *                 example: 15000
 *               nroFactura:
 *                 type: string
 *                 example: FAC-00125
 *               estado:
 *                 type: string
 *                 enum: [enProceso, aprobada, rechazada]
 *                 example: enProceso
 *               legajoUsuario:
 *                 type: integer
 *                 example: 501169
 *               nroCliente:
 *                 type: integer
 *                 example: 1001
 *     responses:
 *       201:
 *         description: Nota creada correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/", notaController.postNota);

/**
 * @swagger
 * /notas/{id}:
 *   put:
 *     summary: Actualizar una nota de credito existente
 *     description: Permite actualizar uno o varios campos de la nota
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motivo:
 *                 type: string
 *               monto:
 *                 type: number
 *               nroFactura:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nota actualizada
 */
router.put("/:id", notaController.updateNota);

/**
 * @swagger
 * /notas/{id}:
 *   delete:
 *     summary: Eliminar una nota de crédito
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la nota
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nota eliminada
 */
router.delete("/:id", notaController.deleteNota);

module.exports = router;