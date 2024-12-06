"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionSeeder = void 0;
const permission_entity_1 = require("../../modules/roles_and_permissions/permission/permission.entity");
const Permission_1 = require("../../modules/roles_and_permissions/permission/Permission");
// Seeder para Permisos
class PermissionSeeder {
    async run(dataSource, factoryManager) {
        const repository = dataSource.getRepository(permission_entity_1.PermissionEntity);
        // Subject User
        const manageUser = new Permission_1.Permission('MANAGE_USERS', 'user', 'manage', 'Acceso completo a la gestión de usuarios');
        const createUser = new Permission_1.Permission('CREATE_USERS', 'user', 'create', 'Creación de nuevos usuarios', manageUser);
        const updateUser = new Permission_1.Permission('UPDATE_USERS', 'user', 'update', 'Modificar datos de usuarios', manageUser);
        const deleteUser = new Permission_1.Permission('DELETE_USERS', 'user', 'delete', 'Eliminación de usuarios', manageUser);
        const readUser = new Permission_1.Permission('READ_USERS', 'user', 'read', 'Obtener datos de usuarios', manageUser);
        const readSelf = new Permission_1.Permission('READ_SELF_USERS', 'user', 'readSelf', 'Obtener datos de usuario autenticado', readUser);
        const updateSelf = new Permission_1.Permission('UPDATE_SELF_USERS', 'user', 'updateSelf', 'Modificar datos de usuario autenticado', updateUser);
        const blockUser = new Permission_1.Permission('BLOCK_UNBLOCK_USERS', 'user', 'block', 'Gestión de bloqueo y desbloqueo de usuarios.', manageUser);
        const manageRolesPermissions = new Permission_1.Permission('MANAGE_ROLES_AND_PERMISSIONS', 'roles_and_permissions', 'manage', 'Gestión de roles y asignación de permisos');
        createUser.parentPermission = manageUser;
        updateUser.parentPermission = manageUser;
        deleteUser.parentPermission = manageUser;
        readUser.parentPermission = manageUser;
        readSelf.parentPermission = readUser;
        updateSelf.parentPermission = updateUser;
        manageUser.childPermissions = [createUser, updateUser, deleteUser, readUser, blockUser];
        readUser.childPermissions = [readSelf];
        updateUser.childPermissions = [updateSelf];
        await repository.save([
            manageUser, createUser, updateUser, deleteUser, readUser, readSelf, updateSelf, blockUser
        ]);
        // Subject Settings
        const manageSettings = new Permission_1.Permission('MANAGE_SETTINGS', 'settings', 'manage', 'Acceso completo a la configuración de la aplicación');
        const readSettings = new Permission_1.Permission('READ_SETTINGS', 'settings', 'read', 'Obtener los datos de configuración actual del sistema', manageSettings);
        const updateEmailConfig = new Permission_1.Permission('UPDATE_EMAIL_CONFIG', 'settings', 'updateEmailConfig', 'Actualización de la configuración de notificaciones por email', manageSettings);
        const updateSecurityConfig = new Permission_1.Permission('UPDATE_SECURITY_CONFIG', 'settings', 'updateSecurityConfig', 'Actualización de la configuración de seguridad de la aplicación', manageSettings);
        const updateProposalExpiration = new Permission_1.Permission('UPDATE_PROPOSAL_EXPIRATION', 'settings', 'updateProposalExpiration', 'Actualización de los días de validez de una propuesta tras ser finalizada', manageSettings);
        const updateDefaultPriceConfig = new Permission_1.Permission('UPDATE_DEFAULT_PRICE_CONFIG', 'settings', 'updateDefaultPriceConfig', 'Actualización de la configuración de precios por defecto', manageSettings);
        manageSettings.childPermissions = [
            updateEmailConfig, updateSecurityConfig, updateProposalExpiration, updateDefaultPriceConfig, readSettings
        ];
        await repository.save([
            manageSettings, updateEmailConfig, updateSecurityConfig, updateProposalExpiration, updateDefaultPriceConfig, readSettings
        ]);
        // Subject Account
        const manageAccount = new Permission_1.Permission('MANAGE_ACCOUNTS', 'account', 'manage', 'Acceso completo a la gestión de cuentas');
        const createAccount = new Permission_1.Permission('CREATE_ACCOUNTS', 'account', 'create', 'Creación de nuevas cuentas', manageAccount);
        const updateAccount = new Permission_1.Permission('UPDATE_ACCOUNTS', 'account', 'update', 'Modificar datos de cuentas', manageAccount);
        const deleteAccount = new Permission_1.Permission('DELETE_ACCOUNTS', 'account', 'delete', 'Eliminación de cuentas', manageAccount);
        const readAccount = new Permission_1.Permission('READ_ACCOUNTS', 'account', 'read', 'Obtener datos de las cuentas', manageAccount);
        const readSelfAccount = new Permission_1.Permission('READ_SELF_ACCOUNTS', 'account', 'readSelf', 'Obtener datos de cuentas relacionadas con el usuario', readAccount);
        const manageSpecialFieldsAccount = new Permission_1.Permission('MANAGE_SPECIAL_FIELDS_ACCOUNTS', 'account', 'manageSpecialFields', 'Acceso a la gestión de campos especiales de cuentas', manageAccount);
        const assignCommercialManager = new Permission_1.Permission('ASSIGN_COMMERCIAL_MANAGER_ACCOUNTS', 'account', 'assignCommercialManager', 'Asignación de responsable comercial de cuenta', manageSpecialFieldsAccount);
        const managePriceConfig = new Permission_1.Permission('MANAGE_PRICE_CONFIG_ACCOUNTS', 'account', 'managePriceConfig', 'Gestión de configuraciones de precio', manageSpecialFieldsAccount);
        const readPriceConfig = new Permission_1.Permission('READ_PRICE_CONFIG_ACCOUNTS', 'account', 'readPriceConfig', 'Obtener configuraciones de precios', managePriceConfig);
        const assignCustomPrices = new Permission_1.Permission('ASSIGN_CUSTOM_PRICES_ACCOUNTS', 'account', 'assignCustomPrices', 'Creación y asignación de configuraciones de precio', managePriceConfig);
        const assignTechnicalManager = new Permission_1.Permission('ASSIGN_TECHNICAL_MANAGER_ACCOUNTS', 'account', 'assignTechnicalManager', 'Asignación de responsable técnico de cuenta', manageSpecialFieldsAccount);
        manageAccount.childPermissions = [createAccount, updateAccount, deleteAccount, readAccount, manageSpecialFieldsAccount];
        manageSpecialFieldsAccount.childPermissions = [assignCommercialManager, managePriceConfig, assignTechnicalManager];
        managePriceConfig.childPermissions = [readPriceConfig, assignCustomPrices];
        readAccount.childPermissions = [readSelfAccount];
        await repository.save([
            manageAccount, createAccount, updateAccount, deleteAccount, readAccount, manageSpecialFieldsAccount,
            assignCustomPrices, assignCommercialManager, assignTechnicalManager, readPriceConfig, managePriceConfig, readSelfAccount
        ]);
        // Subject Roles&Permissions
        await repository.save([manageRolesPermissions]);
        console.log('Datos seed introducidos');
        // Subject Opportunities
        const manageOpportunities = new Permission_1.Permission('MANAGE_OPPORTUNITIES', 'opportunity', 'manage', 'Acceso total a la gestión de oportunidades');
        const readOpportunities = new Permission_1.Permission('READ_OPPORTUNITIES', 'opportunity', 'read', 'Obtener datos de oportunidades', manageOpportunities);
        const readSelfOpportunities = new Permission_1.Permission('READ_SELF_OPPORTUNITIES', 'opportunity', 'readSelf', 'Obtener datos de oportunidades asociadas con el usuario', readOpportunities);
        const updateOpportunities = new Permission_1.Permission('UPDATE_OPPORTUNITIES', 'opportunity', 'update', 'Actualizar datos de oportunidades', manageOpportunities);
        const createOpportunities = new Permission_1.Permission('CREATE_OPPORTUNITIES', 'opportunity', 'create', 'Alta de nuevas oportunidades comerciales', manageOpportunities);
        const deleteOpportunities = new Permission_1.Permission('DELETE_OPPORTUNITIES', 'opportunity', 'delete', 'Eliminación de oportunidades comerciales', manageOpportunities);
        const manageSpecialFieldsOpportunities = new Permission_1.Permission('MANAGE_SPECIAL_FIELDS_OPPORTUNITIES', 'opportunity', 'manageSpecialFields', 'Acceso completo a la gestión de campos especiales de oportunidades', manageOpportunities);
        const manageDocumentsOpportunities = new Permission_1.Permission('MANAGE_DOCUMENTS_OPPORTUNITIES', 'opportunity', 'manageDocument', 'Acceso completo a la gestión de documentos asociados a oportunidad', manageSpecialFieldsOpportunities);
        const uploadDocumentOpportunities = new Permission_1.Permission('UPLOAD_DOCUMENT_OPPORTUNITIES', 'opportunity', 'uploadDocument', 'Habilita la subida de documentos asociados a oportunidad', manageDocumentsOpportunities);
        const downloadDocumentOpportunities = new Permission_1.Permission('DOWNLOAD_DOCUMENT_OPPORTUNITIES', 'opportunity', 'downloadDocument', 'Habilita la descarga de documentos asociados a oportunidad', manageDocumentsOpportunities);
        const deleteDocumentOpportunities = new Permission_1.Permission('DELETE_DOCUMENT_OPPORTUNITIES', 'opportunity', 'deleteDocument', 'Habilita la eliminación de documentos asociados a oportunidad', manageDocumentsOpportunities);
        const assignCustomTypology = new Permission_1.Permission('ASSIGN_NEW_TYPOLOGY_OPPORTUNITIES', 'opportunity', 'assignNewTypology', 'Asignación de nuevas tipologías a oportunidad', manageSpecialFieldsOpportunities);
        const assignCommercialManagerOpportunities = new Permission_1.Permission('ASSIGN_COMMERCIAL_MANAGER_OPPORTUNITIES', 'opportunity', 'assignCommercialManager', 'Asignación personalizada de responsable comercial a oportunidad', manageSpecialFieldsOpportunities);
        const assignTechnicalManagerOpportunities = new Permission_1.Permission('ASSIGN_TECHNICAL_MANAGER_OPPORTUNITIES', 'opportunity', 'assignTechnicalManager', 'Asignación de responsable técnico a oportunidad', manageSpecialFieldsOpportunities);
        const updateStatusOpportunities = new Permission_1.Permission('UPDATE_STATUS_OPPORTUNITIES', 'opportunity', 'updateStatus', 'Actualizar el estado de una oportunidad', manageSpecialFieldsOpportunities);
        manageOpportunities.childPermissions = [
            readOpportunities, updateOpportunities, createOpportunities, deleteOpportunities, manageSpecialFieldsOpportunities
        ];
        readOpportunities.childPermissions = [readSelfOpportunities];
        manageSpecialFieldsOpportunities.childPermissions = [
            assignCustomTypology, assignCommercialManagerOpportunities, assignTechnicalManagerOpportunities, updateStatusOpportunities, manageDocumentsOpportunities
        ];
        manageDocumentsOpportunities.childPermissions = [
            uploadDocumentOpportunities, downloadDocumentOpportunities, deleteDocumentOpportunities
        ];
        await repository.save([manageOpportunities, readOpportunities, updateOpportunities, createOpportunities, deleteOpportunities,
            assignCustomTypology, assignCommercialManagerOpportunities, assignTechnicalManagerOpportunities, manageSpecialFieldsOpportunities, readSelfOpportunities, updateStatusOpportunities,
            manageDocumentsOpportunities, uploadDocumentOpportunities, downloadDocumentOpportunities, deleteDocumentOpportunities]);
        console.log('Datos seed introducidos');
        // Subject Proposals
        const manageProposals = new Permission_1.Permission('MANAGE_PROPOSALS', 'proposal', 'manage', 'Acceso completo a la gestión de propuestas');
        const readProposals = new Permission_1.Permission('READ_PROPOSALS', 'proposal', 'read', 'Obtener datos de propuestas', manageProposals);
        const readSelfProposals = new Permission_1.Permission('READ_SELF_PROPOSALS', 'proposal', 'readSelf', 'Obtener datos de propuestas en caso de estar relacionadas con el usuario', readProposals);
        const createProposals = new Permission_1.Permission('CREATE_PROPOSALS', 'proposal', 'create', 'Creación de nuevas propuestas comerciales', manageProposals);
        const updateProposals = new Permission_1.Permission('UPDATE_PROPOSALS', 'proposal', 'update', 'Actualización de propuestas', manageProposals);
        const deleteProposals = new Permission_1.Permission('DELETE_PROPOSALS', 'proposal', 'delete', 'Eliminación de propuestas comerciales', manageProposals);
        const manageSpecialFieldsProposals = new Permission_1.Permission('MANAGE_SPECIAL_FIELDS_PROPOSALS', 'proposal', 'manageSpecialFields', 'Acceso total a datos sensibles de propuestas', manageProposals);
        const readSpecialFieldsProposals = new Permission_1.Permission('READ_SPECIAL_FIELDS_PROPOSALS', 'proposal', 'readSpecialFields', 'Lectura de datos sensibles de propuesta, como monto total o meses estimados', manageSpecialFieldsProposals);
        const updateSpecialFieldsProposals = new Permission_1.Permission('UPDATE_SPECIAL_FIELDS_PROPOSALS', 'proposal', 'updateSpecialFields', 'Actualización de datos sensibles de propuesta, como monto total o meses estimados', manageSpecialFieldsProposals);
        manageProposals.childPermissions = [
            readProposals, createProposals, updateProposals, deleteProposals, manageSpecialFieldsProposals
        ];
        manageSpecialFieldsProposals.childPermissions = [
            readSpecialFieldsProposals, updateSpecialFieldsProposals
        ];
        readProposals.childPermissions = [readSelfProposals];
        await repository.save([
            manageProposals, readProposals, readSelfProposals, createProposals, updateProposals, deleteProposals, manageSpecialFieldsProposals, readSpecialFieldsProposals, updateSpecialFieldsProposals
        ]);
        console.log('Permisos para Proposal introducidos');
        // Subject Estimations
        const manageEstimations = new Permission_1.Permission('MANAGE_ESTIMATIONS', 'estimation', 'manage', 'Acceso completo a la gestión de estimaciones');
        const readEstimations = new Permission_1.Permission('READ_ESTIMATIONS', 'estimation', 'read', 'Obtener datos de estimaciones', manageEstimations);
        const readSelfEstimations = new Permission_1.Permission('READ_SELF_ESTIMATIONS', 'estimation', 'readSelf', 'Obtener datos de estimaciones en las que el usuario está involucrado', readEstimations);
        const deleteEstimations = new Permission_1.Permission('DELETE_ESTIMATIONS', 'estimation', 'delete', 'Eliminación de estimaciones', manageEstimations);
        const updateStatusEstimations = new Permission_1.Permission('UPDATE_STATUS_ESTIMATIONS', 'estimation', 'updateStatus', 'Actualizar el estado de la estimación', manageEstimations);
        const assignUsersEstimations = new Permission_1.Permission('ASSIGN_USERS_ESTIMATIONS', 'estimation', 'assignUsers', 'Asignación de usuarios a estimación', manageEstimations);
        manageEstimations.childPermissions = [
            readEstimations, deleteEstimations, updateStatusEstimations, assignUsersEstimations
        ];
        readEstimations.childPermissions = [
            readSelfEstimations
        ];
        await repository.save([manageEstimations, readEstimations, readSelfEstimations, deleteEstimations, updateStatusEstimations, assignUsersEstimations]);
        console.log('Datos seed introducidos');
        // Subject Tasks (Sin permisos de lectura, si puedes acceder a estimación puedes acceder a sus tareas)
        const manageTasks = new Permission_1.Permission('MANAGE_TASKS', 'task', 'manage', 'Acceso total a la gestión de tareas');
        const createTasks = new Permission_1.Permission('CREATE_TASKS', 'task', 'create', 'Alta de tareas', manageTasks);
        const deleteTasks = new Permission_1.Permission('DELETE_TASKS', 'task', 'delete', 'Eliminación de tareas y perfiles estimables asociados', manageTasks);
        const updateTasks = new Permission_1.Permission('UPDATE_TASKS', 'task', 'update', 'Actualización de tareas', manageTasks);
        const updateTasksProfiles = new Permission_1.Permission('UPDATE_TASKS_PROFILES', 'task', 'updateTasksProfiles', 'Actualización de estimaciones por perfil de una tarea (asignación de horas)', updateTasks);
        const updateTasksStatus = new Permission_1.Permission('UPDATE_TASKS_STATUS', 'task', 'updateStatus', 'Actualizar estado de una tarea', updateTasks);
        const createTasksProfiles = new Permission_1.Permission('CREATE_TASKS_PROFILES', 'task', 'createTasksProfiles', 'Alta de perfiles estimables para una tarea', updateTasks);
        const deleteTasksProfiles = new Permission_1.Permission('DELETE_TASKS_PROFILES', 'task', 'deleteTasksProfiles', 'Eliminación de perfiles estimables para una tarea', updateTasks);
        manageTasks.childPermissions = [
            createTasks, deleteTasks, updateTasks
        ];
        updateTasks.childPermissions = [
            updateTasksProfiles, createTasksProfiles, deleteTasksProfiles, updateTasksStatus
        ];
        await repository.save([manageTasks, createTasks, deleteTasks, updateTasks, updateTasksProfiles, createTasksProfiles, deleteTasksProfiles, updateTasksStatus]);
        console.log('Datos seed introducidos');
    }
}
exports.PermissionSeeder = PermissionSeeder;
