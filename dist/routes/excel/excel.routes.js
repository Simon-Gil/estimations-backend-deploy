"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const excel_controller_1 = require("../../modules/estimations/excel/excel.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /excel/estimations/{id}/download:
 *   get:
 *     tags:
 *       - Excel  # Etiqueta para agrupar rutas relacionadas con estimaciones
 *     summary: Download estimation as Excel
 *     description: Downloads an Excel file of the estimation details for the specified ID. Requires authorization.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the estimation to download.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     responses:
 *       '200':
 *         description: Excel file downloaded successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       '403':
 *         description: Forbidden - user does not have permission to download the estimation
 *       '404':
 *         description: Not Found - estimation with the specified ID does not exist
 *       '500':
 *         description: Internal Server Error - an unexpected error occurred while processing the request
 */
router.get('/estimations/:id/download', auth_middleware_1.authenticate, excel_controller_1.excelController.downloadExcel);
exports.default = router;
