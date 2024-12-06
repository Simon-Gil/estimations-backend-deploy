"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("../../common/middlewares/authorization.middleware");
const estimation_controller_1 = require("../../modules/estimations/estimation.controller");
const estimation_user_controller_1 = require("../../modules/estimations/estimation-user/estimation-user.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /estimations/{id}/complete:
 *   put:
 *     tags:
 *       - Estimations  # Etiqueta para agrupar rutas relacionadas con estimaciones
 *     summary: Complete estimation
 *     description: Updates the status of a specific estimation. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the estimation to update
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Status updated successfully
 *       '404':
 *         description: Estimation not found
 *       '403':
 *         description: Forbidden - user does not have permission to update status
 */
router.put('/:id/complete', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('estimation'), (0, authorization_middleware_1.authorize)('updateStatus', 'estimation'), estimation_controller_1.estimationController.completeEstimation);
/**
 * @swagger
 * /estimations/{id}/tasks:
 *   post:
 *     summary: Create a new estimation task for a specific account
 *     tags:
 *       - Estimations
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires Bearer authentication
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the estimation for which the task is being created.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               secondLevelCategory:
 *                 type: string
 *                 description: ID de la categoría de segundo nivel.
 *                 example: "ID de categoría segundo nivel"
 *               description:
 *                 type: string
 *                 description: A description of the estimation task.
 *                 example: "Descripción de la tarea"
 *               profiles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "ID perfil 1"
 *     responses:
 *       201:
 *         description: Successfully created the estimation task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created task.
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   description: The name of the newly created task.
 *                   example: "Task Name"
 *                 description:
 *                   type: string
 *                   description: The description of the newly created task.
 *                   example: "This is the task description."
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                   description: The due date of the newly created task.
 *                   example: "2024-12-31"
 *       400:
 *         description: Invalid input data.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Server error.
 */
router.post('/:id/tasks', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('estimation'), (0, authorization_middleware_1.authorize)('create', 'task'), estimation_controller_1.estimationController.createEstimationTask);
/**
 * @swagger
 * /estimations/{id}/tasks:
 *   get:
 *     tags:
 *       - Estimations
 *     summary: Obtiene todas las tareas de una estimación
 *     description: Retrieves a list of all tasks. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la estimacion para recuperar tareas
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of tasks retrieved successfully
 *       '403':
 *         description: Forbidden - user does not have permission to read tasks
 */
router.get('/:id/tasks', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'estimation'), estimation_controller_1.estimationController.getEstimationTasks);
/**
 * @swagger
 * /estimations/{id}/detail:
 *   get:
 *     tags:
 *       - Estimations
 *     summary: Obtiene detalle de una estimación
 *     description: Obtiene detalle de estimación. Incluye tareas y perfiles estimables.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la estimacion
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Detalle de la estimacion
 *       '403':
 *         description: Forbidden - user does not have permission to read estimations
 */
router.get('/:id/detail', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'estimation'), estimation_controller_1.estimationController.getEstimationDetail);
/**
 * @swagger
 * /estimations/{id}:
 *   delete:
 *     tags:
 *       - Estimations
 *     summary: Elimina una estimación
 *     description: Permite la eliminación de una estimación específica mediante su ID. Requiere autenticación y permisos adecuados.
 *     security:
 *       - bearerAuth: []  # Requiere autenticación mediante token Bearer
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la estimación a eliminar
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '203':
 *         description: Estimación eliminada correctamente (sin contenido en la respuesta)
 *       '403':
 *         description: Prohibido - El usuario no tiene permisos para eliminar esta estimación
 *       '404':
 *         description: Estimación no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
router.delete('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('delete', 'estimation'), estimation_controller_1.estimationController.deleteEstimation);
/**
 * @swagger
 * /estimations/done:
 *   get:
 *     tags:
 *       - Estimations
 *     summary: Obtiene todas las estimaciones finalizadas
 *     description: Retrieves a list of estimations. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     responses:
 *       '200':
 *         description: A list of estimations retrieved successfully
 *       '403':
 *         description: Forbidden - user does not have permission to read estimations
 */
router.get('/done', auth_middleware_1.authenticate, estimation_controller_1.estimationController.getDoneEstimations);
/**
 * @swagger
 * /estimations:
 *   get:
 *     tags:
 *       - Estimations
 *     summary: Obtiene todas las estimaciones accesibles por el usuario
 *     description: Retrieves a list of estimations. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     responses:
 *       '200':
 *         description: A list of estimations retrieved successfully
 *       '403':
 *         description: Forbidden - user does not have permission to read estimations
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'estimation'), estimation_controller_1.estimationController.getEstimations);
// Rutas para usuarios
/**
 * @swagger
 * /estimations/{id}/users/finish/:
 *   patch:
 *     tags:
 *       - Estimations
 *     summary: Finaliza la estimación para el usuario autenticado
 *     description: Marca la estimación especificada como "finalizada" para el usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la estimación a finalizar para el usuario autenticado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: La estimación ha sido marcada como finalizada para el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estimación finalizada exitosamente para el usuario."
 *       400:
 *         description: Solicitud inválida, por ejemplo, si el ID de la estimación no existe o el usuario no está asignado a ella.
 *       401:
 *         description: Usuario no autenticado o sin permisos.
 *       500:
 *         description: Error en el servidor al finalizar la estimación.
 */
router.patch('/:id/users/finish/', auth_middleware_1.authenticate, estimation_user_controller_1.estimationUserController.finishEstimation);
/**
 * @swagger
 * /estimations/{id}/users:
 *   post:
 *     summary: Añadir usuarios a una estimación
 *     description: Añadir usuarios a una estimación. Requiere autenticación y autorización.
 *     tags:
 *       - Estimations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the estimation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "ID usuario 1"
 *     responses:
 *       201:
 *         description: User associated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Users added successfully to estimation."
 *       400:
 *         description: Bad request, validation errors
 *       401:
 *         description: Unauthorized, invalid token
 *       403:
 *         description: Forbidden, user does not have permission to modify estimation
 *       500:
 *         description: An error occurred while adding users to estimation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */
router.post('/:id/users', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('estimation'), (0, authorization_middleware_1.authorize)('assignUsers', 'estimation'), estimation_user_controller_1.estimationUserController.assignUsersToEstimation);
/**
 * @swagger
 * /estimations/{estimationId}/users/{userId}:
 *   delete:
 *     tags:
 *       - Estimations
 *     summary: Remove a user from an estimation
 *     description: Removes the relationship between a user and an estimation, effectively removing the user from the estimation.
 *     operationId: deleteUserFromEstimation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: estimationId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the estimation.
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to remove from the estimation.
 *     responses:
 *       200:
 *         description: User successfully removed from estimation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User removed from estimation successfully"
 *       400:
 *         description: Bad Request. Invalid or missing parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bad request: Invalid estimationId or userId."
 *       401:
 *         description: Unauthorized. Authentication is required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Invalid or missing token."
 *       403:
 *         description: Forbidden. The user does not have permission to modify this estimation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden: You don't have permission to remove users from this estimation."
 *       404:
 *         description: Not Found. The estimation or user was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estimation or User not found."
 */
router.delete('/:estimationId/users/:userId', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('estimation'), (0, authorization_middleware_1.authorize)('assignUsers', 'estimation'), estimation_user_controller_1.estimationUserController.deleteUsersFromEstimation);
exports.default = router;
