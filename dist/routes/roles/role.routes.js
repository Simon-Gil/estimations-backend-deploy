"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const role_controller_1 = require("../../modules/roles_and_permissions/role/role.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /roles:
 *   get:
 *     tags:
 *       - Roles  # Etiqueta para agrupar rutas relacionadas con roles
 *     summary: Get all roles
 *     description: Retrieves a list of all roles.
 *     responses:
 *       '200':
 *         description: A list of roles retrieved successfully
 */
router.get('/', role_controller_1.roleController.getRoles);
/**
 * @swagger
 * /roles/{id}/permissions:
 *   put:
 *     tags:
 *       - Roles  # Etiqueta para agrupar rutas relacionadas con roles
 *     summary: Update permissions for a role
 *     description: Updates the permissions associated with a specific role. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the role to update permissions for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               granted:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["ID permiso 1", "ID permiso 2"]
 *               revoked:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["ID permiso 3", "ID permiso 4"]
 *     responses:
 *       '200':
 *         description: Permissions updated successfully
 *       '404':
 *         description: Role not found
 *       '403':
 *         description: Forbidden - user does not have permission to manage roles
 */
router.put('/:id/permissions', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('manage', 'roles_and_permissions'), role_controller_1.roleController.updatePermissions);
/**
 * @swagger
 * /roles/{id}/permissions:
 *   get:
 *     tags:
 *       - Roles  # Etiqueta para agrupar rutas relacionadas con roles
 *     summary: Get permissions for a specific role
 *     description: Retrieves the permissions associated with a specific role. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the role to retrieve permissions for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Role permissions retrieved successfully
 *       '404':
 *         description: Role not found
 *       '403':
 *         description: Forbidden - user does not have permission to read role permissions
 */
router.get('/:id/permissions', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('manage', 'roles_and_permissions'), role_controller_1.roleController.getRolePermissions);
exports.default = router;
