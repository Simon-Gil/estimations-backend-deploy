"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const grade_controller_1 = require("../../modules/company-structure/grade/grade.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /grades:
 *   get:
 *     tags:
 *       - Grades  # Etiqueta para agrupar rutas relacionadas con grados
 *     summary: Get all grades
 *     description: Retrieves a list of all grades. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     responses:
 *       '200':
 *         description: A list of grades retrieved successfully
 *       '403':
 *         description: Forbidden - user does not have permission to read grades
 */
router.get('/', auth_middleware_1.authenticate, grade_controller_1.gradeController.getGrades);
exports.default = router;
