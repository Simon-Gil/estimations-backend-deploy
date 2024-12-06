"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const user_repository_1 = require("./../user/user.repository");
const role_service_1 = require("../roles_and_permissions/role/role.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const department_repository_1 = require("../company-structure/department/department.repository");
const grade_repository_1 = require("../company-structure/grade/grade.repository");
const role_repository_1 = require("../roles_and_permissions/role/role.repository");
const send_user_permissions_dto_1 = require("../roles_and_permissions/permission/send-user-permissions.dto");
const permission_service_1 = require("../roles_and_permissions/permission/permission.service");
const Errors_1 = require("../../common/utils/Errors");
const AppError_1 = require("../../common/utils/AppError");
const email_service_1 = require("../notification/email.service");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const user_dto_1 = require("./dtos/user.dto");
const settings_service_1 = require("../settings/settings.service");
const password_utility_1 = require("./password.utility");
const password_reset_service_1 = require("../auth/password-reset/password-reset.service");
const User_1 = require("./User");
/**
 * Servicio encargado de gestionar las operaciones relacionadas con los usuarios en la aplicación.
 */
class UserService {
    /**
     * Crea un nuevo usuario.
     * @param user - Datos del usuario a crear, incluidos nombre, apellido, email, departamento, grado y roles.
     * @returns El usuario recién creado.
     * @throws {Error} Si el email ya está registrado o si no se encuentra el departamento o grado.
     */
    async createUser(user) {
        // Comprobación de email no existente 
        if (await user_repository_1.userRepo.findOne({ where: { email: user.email } })) {
            throw new Error('El email introducido está asignado a otro usuario');
        }
        const password = password_utility_1.passwordUtility.generatePassword(12);
        const hashedPass = await bcrypt_1.default.hash(password, 10);
        // Departamento
        const department = await department_repository_1.departmentRepo.findOne({ where: { id: user.department } });
        if (!department) {
            throw new Error('Department not found');
        }
        // Nivel
        const grade = await grade_repository_1.gradeRepo.findOne({ where: { id: user.grade } });
        if (!grade) {
            throw new Error('Grade not found');
        }
        // Roles
        let roles = [];
        const automaticRole = await role_service_1.roleService.getRoleByDepartmentAndGrade(user.department, user.grade);
        if (automaticRole) {
            roles.push(automaticRole);
        }
        else {
            throw new Error('No se encontró un rol para el departmento y grado especificados');
        }
        if (user.roles) {
            const assignedRoles = await role_repository_1.roleRepo.findRolesByIds(user.roles);
            assignedRoles.forEach(r => roles.push(r));
        }
        // Creación y guardado del usuario
        const newUser = new User_1.User(user.name, user.lastname, department, grade, roles, user.email, password);
        const createdUser = await user_repository_1.userRepo.save(newUser);
        const resetToken = await password_reset_service_1.passwordResetService.createPasswordResetToken(createdUser);
        // Obtenemos configuración para informar al usuario del tiempo de validez del token reset-password
        const settings = await settings_service_1.settingsService.getSettings();
        email_service_1.emailService.sendNewUserEmail(user.email, newUser.name, hashedPass, resetToken.token, settings.expirationResetTokenHours);
        return createdUser;
    }
    /**
     * Actualiza la información de un usuario existente.
     * @param userId - ID del usuario a actualizar.
     * @param userData - Nuevos datos del usuario.
     * @returns El usuario actualizado.
     * @throws {AppError} Si el usuario no existe o si se intenta asignar un email ya asignado a otro usuario.
     */
    async updateUser(userId, userData) {
        // Obtener el usuario de la base de datos
        const user = await exports.userService.getUserById(userId, ['department', 'grade', 'roles']);
        if (!user) {
            throw new AppError_1.AppError(Errors_1.ErrorCodes.USER_NOT_FOUND, 404);
        }
        // Comprobamos que el mail no esté asociado a otro usuario
        if (userData.email && userData.email !== '') {
            const existingEmailUser = await user_repository_1.userRepo.findOne({ where: { email: userData.email } });
            if (existingEmailUser && existingEmailUser.id !== user.id) {
                throw new Error('El email introducido está asignado a otro usuario');
            }
            user.email = userData.email;
        }
        // Asignacion de departamento
        if (userData.department && userData.department !== '') {
            const existingDepartment = await department_repository_1.departmentRepo.findOne({ where: { id: userData.department } });
            if (existingDepartment) {
                user.department = existingDepartment; // Asignar el departamento encontrado al usuario
            }
            else {
                console.log("Departamento no encontrado.");
            }
        }
        // Asignación de nivel
        if (userData.grade) {
            const existingGrade = await grade_repository_1.gradeRepo.findOne({ where: { id: userData.grade } });
            if (existingGrade) {
                user.grade = existingGrade; // Asignar el grado encontrado al usuario
            }
            else {
                console.log("Grado no encontrado.");
            }
        }
        let roles = [];
        // Asignacion de roles 
        if (userData.roles && userData.roles.length > 0) {
            roles = await Promise.all(userData.roles.map(async (roleId) => {
                return await role_service_1.roleService.getById(roleId);
            }));
            user.roles = roles;
        }
        // Asignacion de los campos que no necesitan desencriptación
        if (userData.name) {
            user.name = userData.name; // Asignar el nuevo nombre si existe
        }
        if (userData.lastname) {
            user.lastname = userData.lastname; // Asignar el nuevo apellido si existe
        }
        // Realizar actualización
        const updatedUser = await user_repository_1.userRepo.save(user);
        return updatedUser;
    }
    /**
     * Obtiene los usuarios filtrados por departamento y grado.
     * @param departmentIds - IDs de los departamentos a filtrar.
     * @param gradeIds - IDs de los grados a filtrar.
     * @returns Lista de usuarios que cumplen con los filtros.
     * @throws {AppError} Si alguno de los departamentos o grados no se encuentra.
     */
    async getFilteredUsers(departmentIds, gradeIds) {
        // Obtenemos las entidades de departamentos y grados 
        const departments = departmentIds.length > 0
            ? await department_repository_1.departmentRepo.findBy({ id: (0, typeorm_1.In)(departmentIds) })
            : [];
        const grades = gradeIds.length > 0
            ? await grade_repository_1.gradeRepo.findBy({ id: (0, typeorm_1.In)(gradeIds) })
            : [];
        if (departmentIds.length > 0 && departments.length === 0) {
            throw new AppError_1.AppError('Al menos un departamento no ha podido ser encontrado con los IDs especificados', 404);
        }
        if (gradeIds.length > 0 && grades.length === 0) {
            throw new AppError_1.AppError('Al menos un nivel no ha podido ser encontrado con los IDs especificados', 404);
        }
        // Definimos condiciones de búsqueda
        const whereConditions = {};
        if (departmentIds.length > 0) {
            whereConditions.department = (0, typeorm_1.In)(departmentIds);
        }
        if (gradeIds.length > 0) {
            whereConditions.grade = (0, typeorm_1.In)(gradeIds);
        }
        whereConditions.isBlocked = false;
        // Consultamos usuarios según las entidades recibidas
        let users = await user_repository_1.userRepo.find({
            where: whereConditions,
            relations: ['department', 'grade'],
        });
        return (0, class_transformer_1.plainToInstance)(user_dto_1.UserDTO, users);
    }
    /**
    * Obtiene todos los usuarios.
    * @returns Una lista de todos los usuarios.
    */
    async getAllUsers() {
        const users = await user_repository_1.userRepo.find({
            relations: ['roles', 'department', 'grade']
        });
        return users;
    }
    /**
     * Obtiene un usuario por su email.
     * @param email - Email del usuario a obtener.
     * @returns El usuario con el email especificado o null si no existe.
     */
    async getUserByEmail(email) {
        return await user_repository_1.userRepo.findOne({ where: { email: email }, relations: ['roles', 'roles.permissions', 'grade', 'department', 'failedLoginAttempts'] });
    }
    /**
    * Obtiene un usuario por su ID.
    * @param userId - ID del usuario a obtener.
    * @param relations - Relaciones opcionales a incluir en la consulta.
    * @returns El usuario con el ID especificado.
    * @throws {AppError} Si el usuario no se encuentra.
    */
    async getUserById(userId, relations) {
        const user = await user_repository_1.userRepo.findOne({
            where: { id: userId },
            relations: relations
        });
        if (!user) {
            throw new AppError_1.AppError('Usuario no encontrado', 404);
        }
        return user;
    }
    /**
     * Obtiene los permisos asociados a los roles de un usuario.
     * @param userId - ID del usuario a obtener los permisos.
     * @returns Lista de permisos agrupados por subject.
     */
    async getUserPermissions(userId) {
        const userRoles = await role_service_1.roleService.getUserRoles(userId);
        const userPermissions = await permission_service_1.permissionService.getPermissionsByRoles(userRoles);
        const groupedPermissions = userPermissions.reduce((acc, permission) => {
            const { subject, action } = permission;
            const existingSubject = acc.find(item => item.subject === subject);
            if (existingSubject) {
                if (!existingSubject.actions.includes(action)) {
                    existingSubject.actions.push(action);
                }
            }
            else {
                acc.push(new send_user_permissions_dto_1.UserPermissionsDto(subject, [action]));
            }
            return acc;
        }, []);
        return groupedPermissions;
    }
    /**
     * Obtiene el usuario con el id especificado junto a sus roles y permisos.
     * @param userId - ID del usuario.
     * @returns El usuario correspondiente al ID proporcionado.
     * @throws {AppError} Si el usuario no se encuentra.
     */
    async getCurrentUser(userId) {
        const user = await user_repository_1.userRepo.findOne({
            where: { id: userId },
            relations: ['roles', 'roles.permissions'],
        });
        if (!user) {
            throw new AppError_1.AppError('User not found', 404);
        }
        return user;
    }
    /**
    * Bloquea o desbloquea a un usuario.
    * @param block - Indicador de si bloquear o desbloquear al usuario.
    * @param userId - ID del usuario a bloquear o desbloquear.
    * @returns El usuario con el estado actualizado.
    * @throws {AppError} Si se intenta bloquear un usuario administrador.
    */
    async setUserBlock(block, userId) {
        const user = await this.getUserById(userId, ['roles']);
        // Restricción para no bloquear usuario administrador
        if (user.roles.some(role => role.name === 'Admin')) {
            throw new AppError_1.AppError('No es posible bloquear a un usuario administrador', 400);
        }
        user.isBlocked = block;
        const savedUser = await user_repository_1.userRepo.save(user);
        return (0, class_transformer_1.plainToInstance)(user_dto_1.UserDTO, savedUser);
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
