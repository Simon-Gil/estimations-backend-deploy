"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const password_reset_controller_1 = require("../../modules/auth/password-reset/password-reset.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /reset-password:
 *   post:
 *     tags:
 *       - Password Reset  # Etiqueta para agrupar rutas relacionadas con el restablecimiento de contraseñas
 *     summary: Reset user password
 *     description: Allows a user to reset their password using a valid token. Requires a valid token sent via email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token provided to the user for password reset
 *                 example: '123456abcdef'
 *               password:
 *                 type: string
 *                 description: New password to set for the user
 *                 example: 'NewStrongPassword123!'
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: 'Contraseña restablecida con éxito'
 *       '400':
 *         description: Invalid or expired token
 *       '500':
 *         description: Internal server error
 */
router.post('/', password_reset_controller_1.passwordResetController.resetPassword);
/**
 * @swagger
 * /reset-password/request:
 *   post:
 *     tags:
 *       - Password Reset  # Etiqueta para agrupar rutas relacionadas con el restablecimiento de contraseñas
 *     summary: Solicita envío de email para cambio de contraseña
 *     description: Permite a un usuario cambiar contraseña a través de enlace recibido por email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *                 example: 'email@example.com'
 *     responses:
 *       '200':
 *         description: Email enviado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: 'Email enviado con éxito'
 *       '500':
 *         description: Internal server error
 */
router.post('/request', password_reset_controller_1.passwordResetController.requestResetPassword);
exports.default = router;
