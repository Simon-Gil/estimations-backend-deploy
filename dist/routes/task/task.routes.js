"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const task_controller_1 = require("../../modules/estimations/task/task.controller");
// Rutas Task
const router = (0, express_1.Router)();
/**
 * @swagger
 * /tasks/{id}/profile-estimation:
 *   post:
 *     summary: Añade un nuevo perfil estimable para la tarea
 *     description: Crea una tarea de estimación de horas en función del perfil proporcionado y del ID de la tarea.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea para la cual se va a crear la estimación.
 *         schema:
 *           type: string
 *           example: "123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profile:
 *                 type: string
 *                 example: "ID de perfil"
 *                 description: El perfil para la estimación de horas.
 *     responses:
 *       200:
 *         description: Tarea creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarea de estimación creada"
 *                 taskId:
 *                   type: string
 *                   example: "1234567890"
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Solicitud incorrecta"
 *       401:
 *         description: No autorizado. Es necesario un token Bearer.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No autorizado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
router.post('/:id/profile-estimation', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('createTasksProfiles', 'task'), task_controller_1.taskController.createHrsTaskProfile);
/**
 * @swagger
 * /tasks/{id}/status:
 *   patch:
 *     summary: Actualiza el estado de una tarea
 *     description: Cambia el estado de una tarea específica usando su ID y el estado proporcionado en la solicitud.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar.
 *         schema:
 *           type: string
 *           example: "123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "DONE"
 *                 description: El nuevo estado de la tarea.
 *     responses:
 *       200:
 *         description: Estado de la tarea actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estado de la tarea actualizado"
 *                 taskId:
 *                   type: string
 *                   example: "1234567890"
 *       400:
 *         description: Error en la solicitud, como un estado no válido o perfiles pendientes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Estado no válido o perfiles pendientes"
 *       401:
 *         description: No autorizado. Se requiere token Bearer.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No autorizado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
router.patch('/:id/status', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('task'), (0, authorization_middleware_1.authorize)('updateStatus', 'task'), task_controller_1.taskController.updateTaskStatus);
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea
 *     description: Elimina una tarea específica usando su ID. Requiere autenticación.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar.
 *         schema:
 *           type: string
 *           example: "1234567890"
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarea eliminada correctamente"
 *       400:
 *         description: Error en la solicitud, como un ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ID de tarea no válido"
 *       401:
 *         description: No autorizado. Se requiere token Bearer.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No autorizado"
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tarea no encontrada"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
router.delete('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('task'), (0, authorization_middleware_1.authorize)('delete', 'task'), task_controller_1.taskController.deleteTask);
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea
 *     description: Recupera una tarea específica usando su ID. Requiere autenticación.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a obtener.
 *         schema:
 *           type: string
 *           example: "1234567890"
 *     responses:
 *       200:
 *         description: Tarea recuperada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1234567890"
 *                 title:
 *                   type: string
 *                   example: "Título de la tarea"
 *                 description:
 *                   type: string
 *                   example: "Descripción de la tarea"
 *                 status:
 *                   type: string
 *                   example: "completada"
 *       400:
 *         description: Error en la solicitud, como un ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ID de tarea no válido"
 *       401:
 *         description: No autorizado. Se requiere token Bearer.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No autorizado"
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tarea no encontrada"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
router.get('/:id', auth_middleware_1.authenticate, task_controller_1.taskController.getTask);
exports.default = router;
