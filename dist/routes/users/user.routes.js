"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./../../modules/user/user.controller");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const router = (0, express_1.Router)();
// Rutas Usuarios
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users  # Etiqueta para agrupar rutas relacionadas con usuarios
 *     summary: Update a user
 *     description: Updates a user's information. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: email del usuario
 *               roles:
 *                 type: array
 *                 description: List of roles assigned to the user
 *                 items:
 *                   type: string
 *                 example: [ID de rol 1, ID de rol 2]
 *               department:
 *                 type: string
 *                 description: Department the user belongs to
 *                 example: ID de departamento
 *               grade:
 *                 type: string
 *                 description: The grade or level of the user in the organization
 *                 example: ID de nivel
 *               name:
 *                 type: string
 *                 description: The first name of the user
 *                 example: Nombre
 *               lastname:
 *                 type: string
 *                 description: The last name of the user
 *                 example: Apellidos
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '404':
 *         description: User not found
 *       '403':
 *         description: Forbidden - user does not have permission to update
 */
router.put('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('update', 'user'), user_controller_1.userController.updateUser);
/**
 * @swagger
 * /users/{id}/block:
 *   put:
 *     tags:
 *       - Users  # Etiqueta para agrupar rutas relacionadas con usuarios
 *     summary: Block or unblock a user
 *     description: Blocks or unblocks a user account. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to block or unblock
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               block:
 *                 type: boolean
 *                 description: Indicates whether to block (true) or unblock (false) the user
 *                 example: true
 *     responses:
 *       '200':
 *         description: User block status updated successfully
 *       '404':
 *         description: User not found
 *       '403':
 *         description: Forbidden - user does not have permission to modify block status
 *       '500':
 *         description: Internal server error
 */
router.put('/:id/block', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('block', 'user'), user_controller_1.userController.setUserBlock);
/**
 * @swagger
 * /users/filtered:
 *   get:
 *     tags:
 *       - Users  # Etiqueta para agrupar rutas relacionadas con usuarios
 *     summary: Retrieve filtered users
 *     description: Retrieves a list of users based on optional filters for departments and grades. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: departments
 *         in: query
 *         required: false
 *         description: Comma-separated list of department IDs to filter users
 *         schema:
 *           type: string
 *           example: "1,2,3"
 *       - name: grades
 *         in: query
 *         required: false
 *         description: Comma-separated list of grade IDs to filter users
 *         schema:
 *           type: string
 *           example: "4,5,6"
 *     responses:
 *       '200':
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the user
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   email:
 *                     type: string
 *                     description: The email of the user
 *                     example: "user@example.com"
 *                   roles:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of roles assigned to the user
 *                     example: ["role1", "role2"]
 *                   department:
 *                     type: string
 *                     description: The ID of the department the user belongs to
 *                     example: "1"
 *                   grade:
 *                     type: string
 *                     description: The ID of the grade of the user
 *                     example: "4"
 *                   name:
 *                     type: string
 *                     description: The first name of the user
 *                     example: "John"
 *                   lastname:
 *                     type: string
 *                     description: The last name of the user
 *                     example: "Doe"
 *       '403':
 *         description: Forbidden - user does not have permission to view users
 *       '500':
 *         description: Internal server error
 */
router.get('/filtered', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'user'), user_controller_1.userController.getFilteredUsers);
/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users  # Etiqueta para agrupar rutas relacionadas con usuarios
 *     summary: Create a new user
 *     description: Creates a new user. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: Email de usuario
 *               password:
 *                 type: string
 *                 example: Password de usuario
 *               name:
 *                 type: string
 *                 example: Nombre
 *               lastname:
 *                 type: string
 *                 example: Apellidos
 *               grade:
 *                 type: string
 *                 example: ID de nivel
 *               department:
 *                 type: string
 *                 example: ID de departamento
 *               roles:
 *                 type: array
 *                 description: List of roles assigned to the user
 *                 items:
 *                   type: string
 *                 example: [ID de rol 1, ID de rol 2]
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request - invalid input data
 *       '403':
 *         description: Forbidden - user does not have permission to create
 */
router.post('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('create', 'user'), user_controller_1.userController.createUser);
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users  # Etiqueta para agrupar rutas relacionadas con usuarios
 *     summary: Get a list of users
 *     description: Retrieves all users. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     responses:
 *       '200':
 *         description: A list of users
 *       '403':
 *         description: Forbidden - user does not have permission to read
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('read', 'user'), user_controller_1.userController.getUsers);
/**
 * @swagger
 * /users/{id}/permissions:
 *   get:
 *     tags:
 *       - Users  # Etiqueta para agrupar rutas relacionadas con usuarios
 *     summary: Get permissions for a specific user
 *     description: Retrieves the permissions associated with a user. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve permissions for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User permissions retrieved successfully
 *       '404':
 *         description: User not found
 *       '403':
 *         description: Forbidden - user does not have permission to read
 */
router.get('/:id/permissions', auth_middleware_1.authenticate, user_controller_1.userController.getUserPermissions);
/**
 * @swagger
 * /users/me:
 *   get:
 *     tags:
 *       - Users  # Etiqueta para agrupar rutas relacionadas con usuarios
 *     summary: Get current user information
 *     description: Retrieves information about the currently authenticated user. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     responses:
 *       '200':
 *         description: Current user information retrieved successfully
 *       '403':
 *         description: Forbidden - user does not have permission to read
 */
router.get('/me', auth_middleware_1.authenticate, user_controller_1.userController.getCurrentUser);
exports.default = router;
