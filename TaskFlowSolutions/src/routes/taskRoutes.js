const express = require('express');
const controller = require('../controllers/taskController');
const router = express.Router();

/**
 * @openapi
 * /api/tareas:
 *   get:
 *     summary: Listar tareas y aplicar filtros opcionales
 *     parameters:
 *       - in: query
 *         name: usuario
 *         schema: { type: string }
 *       - in: query
 *         name: estado
 *         schema: { type: string, enum: [Pendiente, "En progreso", Completada] }
 *       - in: query
 *         name: prioridad
 *         schema: { type: string, enum: [Baja, Media, Alta] }
 *     responses:
 *       200:
 *         description: Lista de tareas
 *   post:
 *     summary: Registrar una tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarea'
 *     responses:
 *       201:
 *         description: Tarea creada
 *       400:
 *         description: Datos inválidos
 *
 * /api/tareas/{id}:
 *   get:
 *     summary: Consultar una tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Tarea encontrada }
 *       404: { description: Tarea no encontrada }
 *   put:
 *     summary: Actualizar una tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarea'
 *     responses:
 *       200: { description: Tarea actualizada }
 *       400: { description: Datos inválidos }
 *       404: { description: Tarea no encontrada }
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Tarea eliminada }
 *       404: { description: Tarea no encontrada }
 */
router.get('/', controller.getTasks);
router.get('/:id', controller.getTaskById);
router.post('/', controller.createTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
