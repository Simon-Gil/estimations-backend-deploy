"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const proposal_controller_1 = require("./../../modules/proposal/proposal.controller");
const account_controller_1 = require("./../../modules/accounts/account.controller");
const router = (0, express_1.default)();
/**
 * @swagger
 * /proposals/{id}:
 *   patch:
 *     tags:
 *       - Proposals  # Etiqueta para agrupar rutas relacionadas con propuestas
 *     summary: Update a proposal
 *     description: Updates an existing proposal with new values for techProposal and goalAndContext. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the proposal to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Raw body containing `techProposal` and `goalAndContext` properties
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               techProposal:
 *                 type: string
 *                 description: Technical proposal details
 *               goalAndContext:
 *                 type: string
 *                 description: The goal and context for the proposal
 *     responses:
 *       '200':
 *         description: Proposal updated successfully
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Proposal not found
 *       '403':
 *         description: Forbidden - user does not have permission to update proposal
 */
router.patch('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkCommercialManagerOpportunity)('proposal'), (0, authorization_middleware_1.authorize)('update', 'proposal'), proposal_controller_1.proposalController.updateProposal);
/**
 * @swagger
 * /proposals/{id}:
 *   delete:
 *     tags:
 *       - Proposals  # Etiqueta para agrupar rutas relacionadas con propuestas
 *     summary: Delete a proposal
 *     description: Deletes a proposal record by its ID. Requires authentication and permission to delete the proposal.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the proposal to delete
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '203':
 *         description: Proposal deleted successfully (no content in response)
 *       '400':
 *         description: Bad request - missing or invalid ID
 *       '401':
 *         description: Unauthorized - user must be authenticated
 *       '403':
 *         description: Forbidden - user does not have permission to delete this proposal
 *       '404':
 *         description: Proposal not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('delete', 'proposal'), proposal_controller_1.proposalController.deleteProposal);
/**
 * @swagger
 * /proposals:
 *   get:
 *     tags:
 *       - Proposals  # Etiqueta para agrupar rutas relacionadas con propuestas
 *     summary: Get a list of proposals
 *     description: Retrieves a list of proposals. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     responses:
 *       '200':
 *         description: A list of proposals retrieved successfully
 *       '403':
 *         description: Forbidden - user does not have permission to read proposals
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'proposal'), proposal_controller_1.proposalController.getProposals);
/**
 * @swagger
 * /proposals/{id}/account:
 *   get:
 *     tags:
 *       - Proposals  # Etiqueta para agrupar rutas relacionadas con propuestas
 *     summary: Get the account related to a proposal
 *     description: Retrieves the account associated with a specific proposal. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the proposal to retrieve the related account for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Account retrieved successfully
 *       '403':
 *         description: Forbidden - user does not have permission to read the account
 *       '404':
 *         description: Proposal or account not found
 */
router.get('/:id/account', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'account'), account_controller_1.accountController.getAccountByProposal);
/**
 * @swagger
 * /proposals/{id}/special-fields:
 *   patch:
 *     tags:
 *       - Proposals  # Etiqueta para agrupar rutas relacionadas con propuestas
 *     summary: Update special fields of a proposal
 *     description: Updates the `total` and `estimatedMonths` fields of a specific proposal. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the proposal to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: number
 *                 description: The updated total value
 *               estimatedMonths:
 *                 type: number
 *                 description: The updated estimated duration in months
 *             example:
 *               total: 50000
 *               estimatedMonths: 12
 *     responses:
 *       '200':
 *         description: The proposal's special fields were updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the updated proposal
 *                 total:
 *                   type: number
 *                   description: The updated total value
 *                 estimatedMonths:
 *                   type: number
 *                   description: The updated estimated duration in months
 *                 example:
 *                   id: "12345"
 *                   total: 50000
 *                   estimatedMonths: 12
 *       '400':
 *         description: Bad Request - Invalid input data
 *       '403':
 *         description: Forbidden - User does not have permission to update special fields
 *       '404':
 *         description: Not Found - Proposal with the specified ID does not exist
 */
router.patch('/:id/special-fields', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateSpecialFields', 'proposal'), proposal_controller_1.proposalController.updateSpecialFields);
/**
 * @swagger
 * /proposals/{id}/functional/pdf:
 *   get:
 *     summary: Obtener funcion en formato PDF para una propuesta.
 *     description: Genera un PDF funcional asociado a una propuesta y lo devuelve como descarga.
 *     tags:
 *       - Proposals  # Etiqueta para agrupar rutas relacionadas con estimaciones
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la propuesta para la cual se genera el PDF
 *         schema:
 *           type: string
 *           example: "e7d7f7d7-d7e7-4c4f-b5a6-cf9f4b3f5b4b"
 *     responses:
 *       200:
 *         description: PDF generado con éxito, listo para descarga
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *               description: El archivo PDF generado.
 *       500:
 *         description: Error interno del servidor al generar el PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al generar el PDF"
 *       404:
 *         description: Propuesta no encontrada, ID no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Propuesta no encontrada"
 *       401:
 *         description: No autorizado. Se requiere autenticación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No autorizado"
 */
router.get('/:id/functional/pdf', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSpecialFields', 'proposal'), proposal_controller_1.proposalController.getClientFunctionalPDF);
/**
 * @swagger
 * /proposals/{id}/functional/doc:
 *   get:
 *     summary: Obtener función en formato DOCX para una propuesta.
 *     description: Genera un documento DOCX funcional asociado a una propuesta y lo devuelve como descarga.
 *     tags:
 *       - Proposals  # Etiqueta para agrupar rutas relacionadas con propuestas
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la propuesta para la cual se genera el documento DOCX
 *         schema:
 *           type: string
 *           example: "e7d7f7d7-d7e7-4c4f-b5a6-cf9f4b3f5b4b"
 *     responses:
 *       200:
 *         description: Documento DOCX generado con éxito, listo para descarga
 *         content:
 *           application/vnd.openxmlformats-officedocument.wordprocessingml.document:
 *             schema:
 *               type: string
 *               format: binary
 *               description: El archivo DOCX generado.
 *       500:
 *         description: Error interno del servidor al generar el documento DOCX
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al generar el documento DOCX"
 *       404:
 *         description: Propuesta no encontrada, ID no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Propuesta no encontrada"
 *       401:
 *         description: No autorizado. Se requiere autenticación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No autorizado"
 */
router.get('/:id/functional/doc', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSpecialFields', 'proposal'), proposal_controller_1.proposalController.getClientFunctionalDOC);
/**
 * @swagger
 * /proposals/{id}:
 *   get:
 *     summary: Obtener detalles de una propuesta
 *     description: Devuelve los detalles de una propuesta específica basado en su ID.
 *     tags:
 *       - Proposals  # Etiqueta para agrupar rutas relacionadas con propuestas
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la propuesta que se desea consultar
 *         schema:
 *           type: string
 *           example: "e7d7f7d7-d7e7-4c4f-b5a6-cf9f4b3f5b4b"
 *     responses:
 *       200:
 *         description: Detalles de la propuesta obtenidos con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la propuesta
 *                   example: "e7d7f7d7-d7e7-4c4f-b5a6-cf9f4b3f5b4b"
 *                 name:
 *                   type: string
 *                   description: Nombre de la propuesta
 *                   example: "Propuesta de Desarrollo Web"
 *                 description:
 *                   type: string
 *                   description: Descripción de la propuesta
 *                   example: "Propuesta para el desarrollo de un sitio web corporativo."
 *                 status:
 *                   type: string
 *                   description: Estado actual de la propuesta
 *                   example: "En revisión"
 *       404:
 *         description: Propuesta no encontrada, ID no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Propuesta no encontrada"
 *       401:
 *         description: No autorizado. Se requiere autenticación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No autorizado"
 *       403:
 *         description: Acceso prohibido. El usuario no tiene permisos para esta acción.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso prohibido"
 *       500:
 *         description: Error interno del servidor al obtener la propuesta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener la propuesta"
 */
router.get('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'proposal'), proposal_controller_1.proposalController.getById);
/**
 * @swagger
 * /proposals/{id}/finish:
 *   patch:
 *     summary: Finalizar una propuesta
 *     description: Permite marcar una propuesta como finalizada, siempre que cumpla con los requisitos para este estado.
 *     tags:
 *       - Proposals  # Etiqueta para agrupar rutas relacionadas con propuestas
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la propuesta que se desea finalizar
 *         schema:
 *           type: string
 *           example: "e7d7f7d7-d7e7-4c4f-b5a6-cf9f4b3f5b4b"
 *     responses:
 *       200:
 *         description: Propuesta finalizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la propuesta
 *                   example: "e7d7f7d7-d7e7-4c4f-b5a6-cf9f4b3f5b4b"
 *                 status:
 *                   type: string
 *                   description: Estado actualizado de la propuesta
 *                   example: "Finalizada"
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "Propuesta finalizada con éxito."
 *       400:
 *         description: Solicitud inválida. La propuesta no está lista para finalizar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "La propuesta no está lista para finalizar."
 *       404:
 *         description: Propuesta no encontrada, ID no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Propuesta no encontrada"
 *       401:
 *         description: No autorizado. Se requiere autenticación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No autorizado"
 *       403:
 *         description: Acceso prohibido. El usuario no tiene permisos para esta acción.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso prohibido"
 *       500:
 *         description: Error interno del servidor al intentar finalizar la propuesta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al finalizar la propuesta"
 */
router.patch('/:id/finish', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateSpecialFields', 'proposal'), proposal_controller_1.proposalController.finishProposal);
exports.default = router;
