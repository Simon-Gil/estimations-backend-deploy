"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const price_config_controller_1 = require("../../modules/accounts/price-config/price-config.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /price-configs/{id}:
 *   put:
 *     tags:
 *       - PriceConfig  # Etiqueta para agrupar rutas relacionadas con la configuración de precios
 *     summary: Update a price configuration
 *     description: Updates an existing price configuration with new profile prices. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the price configuration to update
 *         schema:
 *           type: string
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
router.put('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignCustomPrices', 'account'), price_config_controller_1.priceConfigController.updatePriceConfig);
exports.default = router;
