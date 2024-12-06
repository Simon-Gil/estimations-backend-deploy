"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../modules/auth/auth.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth  # Etiqueta para agrupar rutas relacionadas con usuarios
 *     summary: User login
 *     description: Authenticates a user and returns a token. Requires email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com  # Ejemplo de correo electrónico
 *               password:
 *                 type: string
 *                 example: securePassword123  # Ejemplo de contraseña
 *     responses:
 *       '200':
 *         description: User logged in successfully, returns a JWT token
 *       '401':
 *         description: Unauthorized - invalid email or password
 */
router.post('/login', auth_controller_1.authController.login);
exports.default = router;
