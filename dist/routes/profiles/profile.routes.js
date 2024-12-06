"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const profile_controller_1 = require("../../modules/company-structure/profile/profile.controller");
// Rutas Profile
const router = (0, express_1.Router)();
/**
 * @swagger
 * /profiles:
 *   get:
 *     tags:
 *       - Profiles  # Etiqueta para agrupar rutas relacionadas con perfiles
 *     summary: Get all profiles
 *     description: Retrieves a list of all user profiles.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     responses:
 *       '200':
 *         description: A list of profiles retrieved successfully
 *       '401':
 *         description: Unauthorized - user is not authenticated
 *       '403':
 *         description: Forbidden - user does not have permission to access profiles
 */
router.get('/', auth_middleware_1.authenticate, profile_controller_1.profileController.getAllProfiles);
exports.default = router;
