"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const opportunity_controller_1 = require("./../../modules/opportunity/opportunity.controller");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const document_controller_1 = require("../../modules/opportunity/opportunity-documents/document.controller");
const router = (0, express_1.Router)();
// Rutas para Opportunity
/**
 * @swagger
 * /opportunities/{id}:
 *   put:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Update an opportunity
 *     description: Updates the details of an existing opportunity. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the opportunity to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the opportunity
 *                 example: Nombre de oportunidad
 *               requirements:
 *                 type: array
 *                 description: List of requirements for the opportunity
 *                 items:
 *                   type: string
 *                 example: [Requisito 1, Requisito 2]
 *               technicalManager:
 *                 type: string
 *                 description: ID of the technical manager
 *                 example: ID de responsable técnico
 *               commercialManager:
 *                 type: string
 *                 description: ID of the commercial manager
 *                 example: ID de responsable comercial
 *     responses:
 *       '200':
 *         description: Opportunity updated successfully
 *       '404':
 *         description: Opportunity not found
 *       '403':
 *         description: Forbidden - user does not have permission to update the opportunity
 */
router.put('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('update', 'opportunity'), opportunity_controller_1.opportunityController.updateOpportunity);
/**
 * @swagger
 * /opportunities/{id}/proposals:
 *   post:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Create a proposal for an opportunity
 *     description: Creates a new proposal associated with an existing opportunity. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the opportunity to create a proposal for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               techProposal:
 *                 type: string
 *                 example: "Technical proposal description"
 *               goalAndContext:
 *                 type: string
 *                 example: "Goal of the proposal and its context"
 *               tasks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                       example: "Task description"
 *                     secondLevelCategory:
 *                       type: string
 *                       example: "U2FsdGVkX19abc"
 *                     profiles:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "ID perfil 1"
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "U2FsdGVkX19def"  # ID corto de usuario
 *             example:
 *               techProposal: "Description of the technical proposal"
 *               goalAndContext: "Details of the goal and context"
 *               tasks:
 *                 - description: "Task 1"
 *                   secondLevelCategory: "U2FsdGVkX19abc"
 *                   profiles:
 *                     - "ID perfil 1"
 *                     - "ID perfil 2"
 *                 - description: "Task 2"
 *                   secondLevelCategory: "ID categoría de segundo nivel"
 *                   profiles:
 *                     - "ID perfil 3"
 *                     - "ID perfil 4"
 *               users:
 *                 - "U2FsdGVkX19def"
 *                 - "U2FsdGVkX19ghi"
 *     responses:
 *       '201':
 *         description: Proposal created successfully
 *       '404':
 *         description: Opportunity not found
 *       '403':
 *         description: Forbidden - user does not have permission to create proposal
 */
router.post('/:id/proposals', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkCommercialManagerOpportunity)('opportunity'), (0, authorization_middleware_1.checkTechManagerOpportunity)('opportunity'), (0, authorization_middleware_1.authorize)('create', 'proposal'), opportunity_controller_1.opportunityController.createOpportunityProposal);
/**
 * @swagger
 * /opportunities/{id}/estimations:
 *   get:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Get estimations for an opportunity
 *     description: Retrieves all estimations associated with a specific opportunity. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the opportunity to retrieve estimations for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of estimations retrieved successfully
 *       '404':
 *         description: Opportunity not found
 *       '403':
 *         description: Forbidden - user does not have permission to read estimations
 */
router.get('/:id/estimations', auth_middleware_1.authenticate, opportunity_controller_1.opportunityController.getOpportunityEstimations);
/**
 * @swagger
 * /opportunities/{id}/proposals:
 *   get:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Get proposals for an opportunity
 *     description: Retrieves all proposals associated with a specific opportunity. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the opportunity to retrieve proposals for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of proposals retrieved successfully
 *       '404':
 *         description: Opportunity not found
 *       '403':
 *         description: Forbidden - user does not have permission to read proposals
 */
router.get('/:id/proposals', auth_middleware_1.authenticate, opportunity_controller_1.opportunityController.getOpportunityProposals);
/**
 * @swagger
 * /opportunities:
 *   get:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Get all opportunities
 *     description: Retrieves all opportunities for the authenticated user. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     responses:
 *       '200':
 *         description: A list of opportunities retrieved successfully
 *       '403':
 *         description: Forbidden - user does not have permission to read opportunities
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'opportunity'), opportunity_controller_1.opportunityController.getOpportunities);
/**
 * @swagger
 * /opportunities/{id}/status:
 *   patch:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Update the status of an opportunity
 *     description: Updates the status of a specific opportunity. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the opportunity to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Object containing the new status
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status for the opportunity
 *                 example: "InProgress"  # Puedes ajustar el ejemplo según tu enum
 *     responses:
 *       '200':
 *         description: Status updated successfully
 *       '400':
 *         description: Bad request - invalid input or status
 *       '404':
 *         description: Opportunity not found
 *       '403':
 *         description: Forbidden - user does not have permission to update the status
 */
router.patch('/:id/status', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkCommercialManagerOpportunity)('opportunity'), (0, authorization_middleware_1.authorize)('updateStatus', 'opportunity'), opportunity_controller_1.opportunityController.updateOpportunityStatus);
/**
 * @swagger
 * /opportunities/{id}/documents:
 *   get:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Get all documents associated with an opportunity
 *     description: Retrieves all documents associated with a specific opportunity. Requires authorization.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the opportunity to retrieve documents for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of documents retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   document_id:
 *                     type: string
 *                     description: The unique identifier for the document
 *                   file_name:
 *                     type: string
 *                     description: The name of the document file
 *                   file_type:
 *                     type: string
 *                     description: The MIME type of the document
 *                   file_path:
 *                     type: string
 *                     description: The path to the document in the storage
 *                   opportunity_id:
 *                     type: string
 *                     description: The ID of the opportunity associated with the document
 *       '400':
 *         description: Bad request - invalid opportunity ID
 *       '401':
 *         description: Unauthorized - user must be authenticated
 *       '404':
 *         description: Opportunity not found or no documents found
 *       '403':
 *         description: Forbidden - user does not have permission to access the documents
 */
router.get('/:id/documents', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('downloadDocument', 'opportunity'), document_controller_1.documentController.getOpportunityDocuments);
/**
 * @swagger
 * /opportunities/{id}/documents:
 *   post:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Create a new document associated with an opportunity
 *     description: Creates a new document and associates it with a specific opportunity. Requires authentication.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the opportunity to associate the document with
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Object containing the document details to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 description: The name of the file to be uploaded
 *                 example: "example.pdf"
 *               fileType:
 *                 type: string
 *                 description: The MIME type of the file to be uploaded
 *                 example: "application/pdf"
 *     responses:
 *       '200':
 *         description: Document created and associated with the opportunity successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 document_id:
 *                   type: string
 *                   description: The unique identifier of the newly created document
 *                 file_name:
 *                   type: string
 *                   description: The name of the uploaded file
 *                 file_type:
 *                   type: string
 *                   description: The MIME type of the uploaded file
 *                 file_path:
 *                   type: string
 *                   description: The path where the file is stored
 *                 opportunity_id:
 *                   type: string
 *                   description: The ID of the opportunity the document is associated with
 *       '400':
 *         description: Bad request - missing or invalid data
 *       '401':
 *         description: Unauthorized - user must be authenticated
 *       '404':
 *         description: Opportunity not found
 *       '403':
 *         description: Forbidden - user does not have permission to create a document for this opportunity
 *       '500':
 *         description: Internal server error
 */
router.post('/:id/documents', auth_middleware_1.authenticate, document_controller_1.documentController.createDocumentRecord);
/**
 * @swagger
 * /opportunities/{id}/documents:
 *   delete:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Delete a document associated with an opportunity
 *     description: Deletes a document record associated with a specific opportunity. Requires authentication.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the opportunity to which the document is associated
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Object containing the document details to be deleted
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 description: The name of the file to delete
 *                 example: "example.pdf"
 *     responses:
 *       '200':
 *         description: Document record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message indicating successful deletion
 *                   example: "Document record deleted successfully"
 *       '400':
 *         description: Bad request - missing or invalid data
 *       '401':
 *         description: Unauthorized - user must be authenticated
 *       '404':
 *         description: Document or opportunity not found
 *       '403':
 *         description: Forbidden - user does not have permission to delete this document
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id/documents', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('deleteDocument', 'opportunity'), document_controller_1.documentController.deleteDocumentRecord);
/**
 * @swagger
 * /opportunities/{id}:
 *   delete:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Delete an opportunity
 *     description: Deletes an opportunity record by its ID. Requires authentication and permission to delete the opportunity.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the opportunity to delete
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '203':
 *         description: Opportunity deleted successfully (no content in response)
 *       '400':
 *         description: Bad request - missing or invalid ID
 *       '401':
 *         description: Unauthorized - user must be authenticated
 *       '403':
 *         description: Forbidden - user does not have permission to delete this opportunity
 *       '404':
 *         description: Opportunity not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('delete', 'opportunity'), opportunity_controller_1.opportunityController.deleteOpportunity);
/**
 * @swagger
 * /opportunities/{id}/commercial-manager:
 *   patch:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Assign or update the commercial manager for an opportunity
 *     description: Updates the commercial manager field of an opportunity. Requires authentication and permission to assign a commercial manager.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the opportunity to update
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       description: JSON object containing the new commercial manager ID
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commercialManager:
 *                 type: string
 *                 description: The ID of the new commercial manager
 *                 example: "manager_12345"
 *     responses:
 *       '200':
 *         description: Commercial manager updated successfully
 *       '400':
 *         description: Bad request - missing or invalid data
 *       '401':
 *         description: Unauthorized - user must be authenticated
 *       '403':
 *         description: Forbidden - user does not have permission to assign a commercial manager
 *       '404':
 *         description: Opportunity not found
 *       '500':
 *         description: Internal server error
 */
router.patch('/:id/commercial-manager', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignCommercialManager', 'opportunity'), opportunity_controller_1.opportunityController.assignCommercialManager);
/**
 * @swagger
 * /opportunities/{id}/technical-manager:
 *   patch:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Assign or update the technical manager for an opportunity
 *     description: Updates the technical manager field of an opportunity. Requires authentication and permission to assign a technical manager.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the opportunity to update
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       description: JSON object containing the new technical manager ID
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               technicalManager:
 *                 type: string
 *                 description: The ID of the new technical manager
 *                 example: "manager_54321"
 *     responses:
 *       '200':
 *         description: Technical manager updated successfully
 *       '400':
 *         description: Bad request - missing or invalid data
 *       '401':
 *         description: Unauthorized - user must be authenticated
 *       '403':
 *         description: Forbidden - user does not have permission to assign a technical manager
 *       '404':
 *         description: Opportunity not found
 *       '500':
 *         description: Internal server error
 */
router.patch('/:id/technical-manager', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignTechnicalManager', 'opportunity'), opportunity_controller_1.opportunityController.assignTechnicalManager);
exports.default = router;
