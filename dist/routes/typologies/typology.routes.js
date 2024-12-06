"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const typology_controller_1 = require("../../modules/company-structure/typology/typology.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /typologies:
 *   get:
 *     summary: Get all typologies
 *     description: Retrieve a list of all typologies. This endpoint requires authentication.
 *     tags:
 *       - Typologies
 *     security:
 *       - bearerAuth: []  # Indica que esta ruta requiere autenticación
 *     responses:
 *       200:
 *         description: A list of typologies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TypologyDTO'  # Referencia al DTO
 *       401:
 *         description: Unauthorized, invalid token
 *       500:
 *         description: An error occurred while retrieving typologies
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
 *
 */
router.get('/', auth_middleware_1.authenticate, typology_controller_1.typologyController.getAllTypologies);
/**
 * @swagger
 * /typologies:
 *   post:
 *     summary: Create a new typology
 *     description: Creates a new typology. This endpoint requires authentication and authorization.
 *     tags:
 *       - Typologies
 *     security:
 *       - bearerAuth: []  # Indica que esta ruta requiere autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nombre de tipología"
 *             required:
 *               - name  # Asegura que el nombre es un campo obligatorio
 *     responses:
 *       201:
 *         description: Typology created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/TypologyDTO'  # Referencia al DTO
 *       400:
 *         description: Bad request, validation errors
 *       401:
 *         description: Unauthorized, invalid token
 *       403:
 *         description: Forbidden, user does not have permission to create typology
 *       500:
 *         description: An error occurred while creating typology
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
router.post('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignNewTypology', 'opportunity'), typology_controller_1.typologyController.createTypology);
exports.default = router;
