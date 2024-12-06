"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dtos/create-user.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UserController {
    async createUser(req, res, next) {
        try {
            const userDto = (0, class_transformer_1.plainToInstance)(create_user_dto_1.CreateUserDto, req.body);
            const errors = await (0, class_validator_1.validate)(userDto);
            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }
            const newUser = await user_service_1.userService.createUser(userDto);
            console.log(JSON.stringify(newUser));
            res.status(201).json({ message: 'User created succesfully', user: newUser });
        }
        catch (err) {
            next(err);
        }
    }
    async getFilteredUsers(req, res, next) {
        try {
            const departmentIds = req.query.departments ? req.query.departments.split(',') : [];
            const gradeIds = req.query.grades ? req.query.grades.split(',') : [];
            const users = await user_service_1.userService.getFilteredUsers(departmentIds, gradeIds);
            res.status(200).json(users);
        }
        catch (err) {
            next(err);
        }
    }
    async updateUser(req, res, next) {
        try {
            const userId = req.params.id;
            const userData = req.body;
            const updatedUser = await user_service_1.userService.updateUser(userId, userData);
            res.status(200).json(updatedUser);
        }
        catch (error) {
            next(error);
        }
    }
    async setUserBlock(req, res, next) {
        try {
            const blocked = req.body.block;
            const userId = req.params.id;
            const user = await user_service_1.userService.setUserBlock(blocked, userId);
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async getCurrentUser(req, res, next) {
        try {
            const user = await user_service_1.userService.getUserById(req.user.id, ['roles', 'roles.permissions']);
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await user_service_1.userService.getAllUsers();
            if (users.length === 0) {
                res.status(200).json({ message: 'No se han encontrado usuarios' });
                return;
            }
            else {
                // Eliminar el campo password
                const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
                res.status(200).json(usersWithoutPassword);
            }
        }
        catch (err) {
            next(err);
        }
    }
    async getUserPermissions(req, res) {
        try {
            const userId = req.params.id;
            const userPermissions = await user_service_1.userService.getUserPermissions(userId);
            res.status(200).json(userPermissions);
        }
        catch (err) {
            res.status(500).json({ message: 'Error inesperado del servidor', err });
        }
    }
}
exports.userController = new UserController();
