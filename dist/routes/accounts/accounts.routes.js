"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const account_controller_1 = require("./../../modules/accounts/account.controller");
const price_config_controller_1 = require("./../../modules/accounts/price-config/price-config.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /accounts:
 *   get:
 *     tags:
 *       - Accounts
 *     summary: Obtiene la lista de cuentas
 *     description: Obtiene una lista de todas las cuentas disponibles. Requiere autorización.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de cuentas obtenida exitosamente
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Prohibido - el usuario no tiene permiso para leer cuentas
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'account'), account_controller_1.accountController.getAccounts);
/**
 * @swagger
 * /accounts/{id}/detail:
 *   get:
 *     tags:
 *       - Accounts
 *     summary: Obtiene los detalles de una cuenta específica
 *     description: Devuelve los detalles completos de una cuenta específica identificada por su ID. Requiere autorización y el usuario debe ser gestor técnico o comercial de la cuenta.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cuenta que se desea consultar
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Detalles de la cuenta obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la cuenta
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 name:
 *                   type: string
 *                   description: Nombre de la cuenta
 *                   example: "Empresa ABC"
 *                 technicalManager:
 *                   type: object
 *                   description: Detalles del gestor técnico de la cuenta
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del gestor técnico
 *                       example: "789e1234-b12a-45c6-d678-123456789abc"
 *                     name:
 *                       type: string
 *                       description: Nombre del gestor técnico
 *                       example: "Juan Pérez"
 *                 commercialManager:
 *                   type: object
 *                   description: Detalles del gestor comercial de la cuenta
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del gestor comercial
 *                       example: "567f8901-d34e-56f7-a890-123456789def"
 *                     name:
 *                       type: string
 *                       description: Nombre del gestor comercial
 *                       example: "María López"
 *                 priceConfig:
 *                   type: object
 *                   description: Configuración de precios de la cuenta
 *                   properties:
 *                     currency:
 *                       type: string
 *                       description: Moneda utilizada en la cuenta
 *                       example: "USD"
 *                     discountRate:
 *                       type: number
 *                       description: Tasa de descuento aplicada
 *                       example: 10.5
 *       '401':
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No autorizado"
 *       '403':
 *         description: Prohibido - el usuario no tiene permisos para acceder a la cuenta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso prohibido"
 *       '404':
 *         description: Cuenta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Cuenta no encontrada"
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
// Se comprueba permiso necesario readSelf account, despues se comprueba si es resp. tecnico o comercial, si lo es, autoriza, si no se comprueba read account
router.get('/:id/detail', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'account'), (0, authorization_middleware_1.checkCommercialOrTechManagerAccount)(), (0, authorization_middleware_1.authorize)('read', 'account'), account_controller_1.accountController.getAccountDetail);
/**
 * @swagger
 * /accounts:
 *   post:
 *     tags:
 *       - Accounts
 *     summary: Crear nueva cuenta
 *     description: Crea una nueva cuenta en el sistema. Requiere autorización.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la cuenta
 *               email:
 *                 type: string
 *                 description: Correo electrónico de la cuenta
 *               technicalManager:
 *                 type: string
 *                 description: ID del responsable técnico
 *               commercialManager:
 *                 type: string
 *                 description: ID del responsable comercial
 *               isCustomer:
 *                 type: boolean
 *                 description: Indica si es un cliente
 *     responses:
 *       '201':
 *         description: Cuenta creada exitosamente
 *       '400':
 *         description: Solicitud incorrecta
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Prohibido - el usuario no tiene permiso para crear cuentas
 */
router.post('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('create', 'account'), account_controller_1.accountController.createAccount);
/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     tags:
 *       - Accounts
 *     summary: Actualizar cuenta
 *     description: Actualiza los detalles de una cuenta existente. Requiere autorización.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la cuenta a actualizar
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
 *                 description: Nombre de la cuenta actualizado
 *               email:
 *                 type: string
 *                 description: Correo electrónico actualizado
 *               technicalManager:
 *                 type: string
 *                 example: ID de responsable técnico
 *                 description: ID del responsable técnico
 *               commercialManager:
 *                 type: string
 *                 example: ID de responsable comercial
 *                 description: ID del responsable comercial
 *               isCustomer:
 *                 type: boolean
 *                 description: Indica si es un cliente
 *     responses:
 *       '200':
 *         description: Cuenta actualizada exitosamente
 *       '404':
 *         description: Cuenta no encontrada
 *       '403':
 *         description: Prohibido - el usuario no tiene permiso para actualizar la cuenta
 */
router.put('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('update', 'account'), account_controller_1.accountController.updateAccount);
/**
 * @swagger
 * /accounts/{id}/opportunities:
 *   post:
 *     tags:
 *       - Accounts
 *     summary: Create an opportunity associated with an account
 *     description: Crea una nueva oportunidad asociada a una cuenta existente. Requiere autorización.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la cuenta para asociar la oportunidad
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
 *                 example: Nombre de la oportunidad
 *                 description: Nombre de la oportunidad
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: Requisito 1
 *                 description: Lista de requisitos de la oportunidad
 *               typology:
 *                 type: string
 *                 example: ID de tipología
 *                 description: Tipología de la oportunidad
 *               technicalManager:
 *                 type: string
 *                 example: ID de responsable técnico
 *                 description: ID de responsable técnico
 *               comercialManager:
 *                 type: string
 *                 example: ID de responsable comercial
 *                 description: ID del responsable comercial
 *     responses:
 *       '201':
 *         description: Oportunidad creada exitosamente
 *       '404':
 *         description: Cuenta no encontrada
 *       '403':
 *         description: Prohibido - el usuario no tiene permiso para crear oportunidades
 */
router.post('/:id/opportunities', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkCommercialManagerAccount)(), (0, authorization_middleware_1.authorize)('create', 'opportunity'), account_controller_1.accountController.createAccountOpportunity);
/**
 * @swagger
 * /accounts/{id}/opportunities:
 *   get:
 *     tags:
 *       - Accounts
 *     summary: Get opportunities for an account
 *     description: Recupera todas las oportunidades asociadas a una cuenta específica. Requiere autorización.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la cuenta para recuperar oportunidades
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de oportunidades obtenida exitosamente
 *       '404':
 *         description: Cuenta no encontrada
 *       '403':
 *         description: Prohibido - el usuario no tiene permiso para leer oportunidades
 */
router.get('/:id/opportunities', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'opportunity'), account_controller_1.accountController.getAccountOpportunities);
/**
 * @swagger
 * /accounts/{id}/price-config:
 *   post:
 *     tags:
 *       - Accounts
 *     summary: Create price configuration for an account
 *     description: Crea una configuración de precios para una cuenta existente. Requiere autorización.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la cuenta para crear la configuración de precios
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
 *                 description: Lista de configuraciones de precios para perfiles
 *                 items:
 *                   type: object
 *                   properties:
 *                     profile:
 *                       type: string
 *                       description: El perfil para el cual se está configurando el precio
 *                       example: "ID de perfil"
 *                     priceH:
 *                       type: number
 *                       description: Precio por hora asignado al perfil
 *                       example: 150.5
 *     responses:
 *       '201':
 *         description: Configuración de precios creada exitosamente
 *       '404':
 *         description: Cuenta no encontrada
 *       '403':
 *         description: Prohibido - el usuario no tiene permiso para crear configuración de precios
 */
router.post('/:id/price-config', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignCustomPrices', 'account'), price_config_controller_1.priceConfigController.createPriceConfig);
/**
 * @swagger
 * /accounts/{id}/price-config:
 *   get:
 *     summary: Get price configuration for a specific account
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires Bearer authentication
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the account to retrieve the price configuration for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the price configuration.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 priceConfigId:
 *                   type: string
 *                   description: The ID of the price configuration.
 *                 profileId:
 *                   type: string
 *                   description: The ID of the profile associated with the price configuration.
 *                 priceH:
 *                   type: number
 *                   format: decimal
 *                   description: The hourly price.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Server error.
 */
router.get('/:id/price-config', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readPriceConfig', 'account'), account_controller_1.accountController.getAccountPriceConfig);
/**
 * @swagger
 * /accounts/{id}/price-config/assign-default:
 *   put:
 *     summary: Asignar configuración de precio por defecto
 *     description: Asigna la configuración de precio predeterminada a la cuenta especificada por el ID.
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires Bearer authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cuenta a la que se le asignará la configuración de precio por defecto.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Configuración de precio asignada correctamente.
 *       401:
 *         description: No autorizado. Token no válido o ausente.
 *       404:
 *         description: No se encontró la cuenta con el ID proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
// Con autorizacion assignCustomPrices, ya que se le está cambiando el precio actual aunque sea a default
router.put('/:id/price-config/assign-default', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignCustomPrices', 'account'), account_controller_1.accountController.assignDefaultPriceConfig);
/**
 * @swagger
 * /accounts/{id}/technical-manager:
 *   patch:
 *     summary: Asignar o actualizar el gestor técnico de una cuenta
 *     description: Actualiza el campo de gestor técnico de una cuenta específica. Requiere autenticación y permiso para asignar gestores técnicos.
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación Bearer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cuenta a la que se le asignará el gestor técnico.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       description: Objeto JSON que contiene el ID del nuevo gestor técnico.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               technicalManager:
 *                 type: string
 *                 description: ID del nuevo gestor técnico
 *                 example: "manager_54321"
 *     responses:
 *       200:
 *         description: Gestor técnico actualizado correctamente.
 *       401:
 *         description: No autorizado. Token no válido o ausente.
 *       403:
 *         description: Prohibido. El usuario no tiene permiso para asignar gestores técnicos.
 *       404:
 *         description: No se encontró la cuenta con el ID proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/:id/technical-manager', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignTechnicalManager', 'account'), account_controller_1.accountController.assignTechnicalManager);
/**
 * @swagger
 * /accounts/{id}/commercial-manager:
 *   patch:
 *     summary: Asignar o actualizar el gestor comercial de una cuenta
 *     description: Actualiza el campo de gestor comercial de una cuenta específica. Requiere autenticación y permiso para asignar gestores comerciales.
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación Bearer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cuenta a la que se le asignará el gestor comercial.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       description: Objeto JSON que contiene el ID del nuevo gestor comercial.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commercialManager:
 *                 type: string
 *                 description: ID del nuevo gestor comercial
 *                 example: "manager_12345"
 *     responses:
 *       200:
 *         description: Gestor comercial actualizado correctamente.
 *       401:
 *         description: No autorizado. Token no válido o ausente.
 *       403:
 *         description: Prohibido. El usuario no tiene permiso para asignar gestores comerciales.
 *       404:
 *         description: No se encontró la cuenta con el ID proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/:id/commercial-manager', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignCommercialManager', 'account'), account_controller_1.accountController.assignCommercialManager);
exports.default = router;
