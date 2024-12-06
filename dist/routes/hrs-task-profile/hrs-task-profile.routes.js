"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const hrs_task_profile_controller_1 = require("../../modules/estimations/task/hrs-task-profile/hrs-task-profile.controller");
const authorization_middleware_1 = require("./../..//common/middlewares/authorization.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /hrs-task-profile/{taskId}/{profileId}:
 *   put:
 *     tags:
 *       - HrsTaskProfile
 *     summary: Actualiza la estimación de horas por perfiles para una tarea
 *     description: Actualiza la estimación de horas por perfiles para una tarea. Requiere autorización.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *       - name: profileId
 *         in: path
 *         required: true
 *         description: The ID of the profile to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hMin:
 *                 type: number
 *                 description: Horas mínimas
 *                 example: "5"
 *               hMax:
 *                 type: number
 *                 description: Horas máximas
 *                 example: "10"
 *     responses:
 *       '200':
 *         description: Status updated successfully
 *       '404':
 *         description: Estimation not found
 *       '403':
 *         description: Forbidden - user does not have permission to update status
 */
router.put('/:taskId/:profileId', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateTasksProfiles', 'task'), hrs_task_profile_controller_1.hrsTaskProfileController.updateHrsTaskProfile);
/**
 * @swagger
 * /hrs-task-profile/{taskId}/{profileId}:
 *   delete:
 *     summary: Elimina una relación entre una tarea y un perfil
 *     description: Elimina la asociación entre una tarea específica y un perfil según sus identificadores. Requiere autenticación.
 *     tags:
 *       - HrsTaskProfile  # Etiqueta para agrupar rutas relacionadas
 *     security:
 *       - bearerAuth: []  # Requiere autenticación
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a eliminar
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del perfil asociado a la tarea
 *     responses:
 *       200:
 *         description: Relación entre la tarea y el perfil eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la eliminación fue exitosa
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "Tarea-perfil eliminada correctamente"
 *       400:
 *         description: Solicitud incorrecta - datos faltantes o no válidos
 *       401:
 *         description: No autorizado - el usuario debe estar autenticado
 *       403:
 *         description: Prohibido - el usuario no tiene permisos para eliminar esta relación
 *       404:
 *         description: No encontrado - no se encontró la tarea o el perfil
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:taskId/:profileId', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('task'), (0, authorization_middleware_1.authorize)('delete', 'task'), hrs_task_profile_controller_1.hrsTaskProfileController.deleteHrsTaskProfile);
exports.default = router;
