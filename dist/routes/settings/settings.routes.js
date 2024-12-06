"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const settings_controller_1 = require("../../modules/settings/settings.controller");
// Rutas Settings
const router = (0, express_1.Router)();
/**
 * @swagger
 * /settings/email-config:
 *   patch:
 *     summary: Actualiza la configuración de notificaciones por correo.
 *     description: Permite configurar las notificaciones automáticas enviadas por correo electrónico, como finalización de estimaciones, tareas o asignación de usuarios.
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos necesarios para actualizar la configuración de notificaciones por correo.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sendUserFinishedEmail:
 *                 type: boolean
 *                 description: Habilitar o deshabilitar el envío de correos al finalizar una tarea de estimación.
 *               sendDoneEstimationEmail:
 *                 type: boolean
 *                 description: Habilitar o deshabilitar el envío de correos al completar una estimación.
 *               sendAssignedUserEmail:
 *                 type: boolean
 *                 description: Habilitar o deshabilitar el envío de correos al asignar un usuario a una estimación.
 *     responses:
 *       200:
 *         description: Configuración de correo actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userFinished:
 *                   type: boolean
 *                 estimationDone:
 *                   type: boolean
 *                 userAssigned:
 *                   type: boolean
 *       400:
 *         description: Solicitud malformada o datos incompletos.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/email-config', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateEmailConfig', 'settings'), settings_controller_1.settingsController.updateEmailConfig);
/**
 * @swagger
 * /settings/security-config:
 *   patch:
 *     summary: Actualiza la configuración de seguridad.
 *     description: Configura parámetros relacionados con intentos fallidos de inicio de sesión, bloqueo temporal, y expiración de tokens.
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos necesarios para actualizar la configuración de seguridad.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maxLoginAttempts:
 *                 type: integer
 *                 description: Número máximo de intentos fallidos antes de bloquear el acceso.
 *               blockDurationMinutes:
 *                 type: integer
 *                 description: Duración del bloqueo en minutos.
 *               expirationAuthTokenHours:
 *                 type: integer
 *                 description: Horas de validez del token de autenticación.
 *               expirationResetTokenHours:
 *                 type: integer
 *                 description: Horas de validez del token para restablecimiento de contraseña.
 *     responses:
 *       200:
 *         description: Configuración de seguridad actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 maxLoginAttempts:
 *                   type: integer
 *                 blockDurationMinutes:
 *                   type: integer
 *                 expirationAuthTokenHours:
 *                   type: integer
 *                 expirationResetTokenHours:
 *                   type: integer
 *       400:
 *         description: Solicitud malformada o datos incompletos.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/security-config', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateSecurityConfig', 'settings'), settings_controller_1.settingsController.updateSecurityConfig);
/**
 * @swagger
 * /settings/proposal-expiration:
 *   patch:
 *     summary: Actualiza los días de validez de las propuestas.
 *     description: Define cuántos días una propuesta será válida antes de expirar.
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos necesarios para actualizar los días de validez de las propuestas.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expirationProposalDays:
 *                 type: integer
 *                 description: Días de validez de una propuesta.
 *     responses:
 *       200:
 *         description: Configuración de días de validez de propuestas actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 expirationDays:
 *                   type: integer
 *       400:
 *         description: Solicitud malformada o datos incompletos.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/proposal-expiration', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateProposalExpiration', 'settings'), settings_controller_1.settingsController.updateExpirationProposalDays);
/**
 * @swagger
 * /settings/default-price-config:
 *   patch:
 *     summary: Actualiza la configuración de precios predeterminados.
 *     description: Define los precios predeterminados para diferentes perfiles de usuario.
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profilePrices:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     profile:
 *                       type: string
 *                       example: "ID Perfil"
 *                     priceH:
 *                       type: number
 *                       example: 10
 *             example:
 *               profilePrices:
 *                 - profile: "ID perfil"
 *                   priceH: 10
 *                 - profile: "ID perfil"
 *                   priceH: 20
 *     responses:
 *       '200':
 *         description: Price configuration updated successfully
 *       '404':
 *         description: Price configuration not found
 *       '403':
 *         description: Forbidden - user does not have permission to update price configuration
 */
router.patch('/default-price-config', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateDefaultPriceConfig', 'settings'), settings_controller_1.settingsController.updateDefaultPriceConfig);
/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Obtiene la configuración actual del sistema.
 *     description: Recupera todos los ajustes configurados, incluyendo seguridad, notificaciones, plazos, y precios predeterminados.
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Configuración obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 emailConfig:
 *                   type: object
 *                   properties:
 *                     userFinished:
 *                       type: boolean
 *                     estimationDone:
 *                       type: boolean
 *                     userAssigned:
 *                       type: boolean
 *                 securityConfig:
 *                   type: object
 *                   properties:
 *                     maxLoginAttempts:
 *                       type: integer
 *                     blockdurationMinutes:
 *                       type: integer
 *                     expirationAuthTokenHours:
 *                       type: integer
 *                     expirationResetTokenHours:
 *                       type: integer
 *                 proposalExpiration:
 *                   type: integer
 *                 defaultPriceConfig:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       profile:
 *                         type: string
 *                       price:
 *                         type: number
 *       403:
 *         description: El usuario no tiene permisos para acceder a la configuración.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('read', 'settings'), settings_controller_1.settingsController.getSettings);
/**
 * @swagger
 * /settings/default-price-config:
 *   get:
 *     summary: Obtiene la configuración de precios predeterminados.
 *     description: Recupera la lista de precios predeterminados configurados para los perfiles.
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Configuración de precios predeterminados obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   profile:
 *                     type: string
 *                   price:
 *                     type: number
 *       403:
 *         description: El usuario no tiene permisos para acceder a la configuración de precios predeterminados.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/default-price-config', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateDefaultPriceConfig', 'settings'), settings_controller_1.settingsController.getDefaultPriceConfig);
exports.default = router;
