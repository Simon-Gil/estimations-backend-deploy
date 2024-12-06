"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCommercialManagerOpportunity = exports.checkTechManagerOpportunity = exports.checkCommercialOrTechManagerAccount = exports.checkCommercialManagerAccount = exports.authorize = void 0;
const ability_1 = require("@casl/ability");
const abilities_1 = require("./../../config/abilities");
const estimation_service_1 = require("./../../modules/estimations/estimation.service");
const AppError_1 = require("./../utils/AppError");
const opportunity_service_1 = require("./../../modules/opportunity/opportunity.service");
const task_service_1 = require("../../modules/estimations/task/task.service");
const account_service_1 = require("./../../modules/accounts/account.service");
const proposal_service_1 = require("./../../modules/proposal/proposal.service");
// Middleware de autorización principal
const authorize = (action, subject) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
            // Si ya está autorizado, pasar al siguiente middleware
            if (req.isAuthorized) {
                return next();
            }
            const ability = await (0, abilities_1.defineAbilitiesFor)(req.user);
            ability_1.ForbiddenError.from(ability).throwUnlessCan(action, subject);
            next();
        }
        catch (error) {
            if (error instanceof ability_1.ForbiddenError) {
                res.status(403).json({ message: 'No tienes los permisos necesarios para realizar esta acción' });
                return;
            }
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    };
};
exports.authorize = authorize;
// Funcion para determinar si un usuario es responsable comercial de una cuenta
const checkCommercialManagerAccount = () => {
    return async (req, res, next) => {
        try {
            const account = await account_service_1.accountService.getAccountById(req.params.id, ['commercialManager']);
            if (account.commercialManager.id === req.user.id) {
                req.isAuthorized = true;
                return next();
            }
            return next();
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                res.status(403).json({ message: error.message });
                return;
            }
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
            return;
        }
    };
};
exports.checkCommercialManagerAccount = checkCommercialManagerAccount;
// Función para determinar si un usuario es responsable tecnico o comercial de cuenta 
const checkCommercialOrTechManagerAccount = () => {
    return async (req, res, next) => {
        try {
            const account = await account_service_1.accountService.getAccountById(req.params.id, ['commercialManager', 'technicalManager']);
            // Si el usuario es el responsable técnico, permitir el paso al siguiente middleware
            if (account.commercialManager.id === req.user.id || account.technicalManager === req.user.id) {
                req.isAuthorized = true;
                return next(); // Usuario autorizado
            }
            return next();
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                res.status(403).json({ message: error.message });
                return;
            }
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
            return;
        }
    };
};
exports.checkCommercialOrTechManagerAccount = checkCommercialOrTechManagerAccount;
// Función para determinar si un usuario es responsable  tecnico de una entidad
const checkTechManagerOpportunity = (entity) => {
    return async (req, res, next) => {
        try {
            let opportunity;
            switch (entity) {
                case 'task':
                    const taskId = req.params.taskId ? req.params.taskId : req.params.id;
                    opportunity = (await task_service_1.taskService.getById(taskId, ['estimation.proposal.opportunity.technicalManager'])).estimation.proposal.opportunity;
                    break;
                case 'estimation':
                    const estimationId = req.params.estimationId ? req.params.estimationId : req.params.id;
                    opportunity = (await estimation_service_1.estimationService.getById(estimationId, ['proposal.opportunity.technicalManager'])).proposal.opportunity;
                    break;
                case 'proposal':
                    const proposalId = req.params.proposalId ? req.params.proposalId : req.params.id;
                    opportunity = (await proposal_service_1.proposalService.getById(proposalId, ['opportunity.technicalManager'])).opportunity;
                    break;
                case 'opportunity':
                    const opportunityId = req.params.opportunityId ? req.params.opportunityId : req.params.id;
                    opportunity = await opportunity_service_1.opportunityService.getById(opportunityId, ['technicalManager']);
                    break;
                default:
                    throw new Error('El valor introducido como parámetro es incorrecto');
            }
            // Si el usuario es el responsable tecnico, permitir el paso al siguiente middleware
            if (opportunity.technicalManager?.id === req.user.id) {
                req.isAuthorized = true;
                return next();
            }
            return next();
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                res.status(403).json({ message: error.message });
                return;
            }
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
            return;
        }
    };
};
exports.checkTechManagerOpportunity = checkTechManagerOpportunity;
// Función para determinar si un usuario es responsable  comercial de una entidad
const checkCommercialManagerOpportunity = (entity) => {
    return async (req, res, next) => {
        try {
            let opportunity;
            switch (entity) {
                case 'task':
                    const taskId = req.params.taskId ? req.params.taskId : req.params.id;
                    opportunity = (await task_service_1.taskService.getById(taskId, ['estimation.proposal.opportunity.commercialManager'])).estimation.proposal.opportunity;
                    break;
                case 'estimation':
                    const estimationId = req.params.estimationId ? req.params.estimationId : req.params.id;
                    opportunity = (await estimation_service_1.estimationService.getById(estimationId, ['proposal.opportunity.commercialManager'])).proposal.opportunity;
                    break;
                case 'proposal':
                    const proposalId = req.params.proposalId ? req.params.proposalId : req.params.id;
                    opportunity = (await proposal_service_1.proposalService.getById(proposalId, ['opportunity.commercialManager'])).opportunity;
                    break;
                case 'opportunity':
                    const opportunityId = req.params.opportunityId ? req.params.opportunityId : req.params.id;
                    opportunity = await opportunity_service_1.opportunityService.getById(opportunityId, ['commercialManager']);
                    break;
                default:
                    throw new Error('El valor introducido como parámetro es incorrecto');
            }
            // Si el usuario es el responsable comercial, permitir el paso al siguiente middleware
            if (opportunity.commercialManager.id === req.user.id) {
                req.isAuthorized = true;
                return next(); // Usuario autorizado
            }
            return next();
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                res.status(403).json({ message: error.message });
                return;
            }
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
            return;
        }
    };
};
exports.checkCommercialManagerOpportunity = checkCommercialManagerOpportunity;
