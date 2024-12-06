"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const department_controller_1 = require("../../modules/company-structure/department/department.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /departments:
 *   get:
 *     tags:
 *       - Departments  # Etiqueta para agrupar rutas relacionadas con departamentos
 *     summary: Get all departments
 *     description: Retrieves a list of all departments. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     responses:
 *       '200':
 *         description: A list of departments
 *       '403':
 *         description: Forbidden - user does not have permission to read departments
 */
router.get('/', auth_middleware_1.authenticate, department_controller_1.departmentController.getDepartments);
exports.default = router;
