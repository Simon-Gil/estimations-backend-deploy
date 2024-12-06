"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const permission_controller_1 = require("../../modules/roles_and_permissions/permission/permission.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /permissions:
 *   get:
 *     tags:
 *       - Permissions  # Etiqueta para agrupar rutas relacionadas con permisos
 *     summary: Get all permissions
 *     description: Retrieves a list of all permissions available in the system. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     responses:
 *       '200':
 *         description: A list of permissions retrieved successfully
 *       '403':
 *         description: Forbidden - user does not have permission to manage roles and permissions
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('manage', 'roles_and_permissions'), permission_controller_1.permissionController.getPermissions);
exports.default = router;
