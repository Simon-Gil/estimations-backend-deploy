"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockSeeder = void 0;
const User_1 = require("../modules/user/User");
const department_service_1 = require("../modules/company-structure/department/department.service");
const grade_service_1 = require("../modules/company-structure/grade/grade.service");
const grade_entity_1 = require("../modules/company-structure/grade/grade.entity");
const role_service_1 = require("../modules/roles_and_permissions/role/role.service");
const role_entity_1 = require("../modules/roles_and_permissions/role/role.entity");
const user_repository_1 = require("../modules/user/user.repository");
const Account_1 = require("../modules/accounts/Account");
const price_config_service_1 = require("./../modules/accounts/price-config/price-config.service");
const account_repository_1 = require("./../modules/accounts/account.repository");
const Typology_1 = require("../modules/company-structure/typology/Typology");
const typology_repository_1 = require("../modules/company-structure/typology/typology.repository");
const Opportunity_1 = require("../modules/opportunity/Opportunity");
const opportunity_repository_1 = require("../modules/opportunity/opportunity.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const department_entity_1 = require("../modules/company-structure/department/department.entity");
// Encontrar deps
function depByName(departments, name) {
    const dep = departments.find(department => department.name === name);
    // Crea una copia si existe, sin modificar el objeto original
    if (dep) {
        const depCopy = { ...dep, id: dep.id };
        return depCopy;
    }
    else {
        return new department_entity_1.DepartmentEntity();
    }
}
// Encontrar grades
function gradeByName(grades, name) {
    const grade = grades.find(grade => grade.name === name);
    if (grade) {
        const gradeCopy = { ...grade, id: grade.id };
        return gradeCopy;
    }
    else {
        return new grade_entity_1.GradeEntity();
    }
}
// Encontrar roles
function roleByName(roles, name) {
    const role = roles.find(role => role.name === name);
    if (role) {
        const roleCopy = { ...role, id: role.id };
        return roleCopy;
    }
    else {
        return new role_entity_1.RoleEntity();
    }
}
class MockSeeder {
    async run(dataSource, factoryManager) {
        const departments = await department_service_1.departmentService.getAllDepartments();
        const grades = await grade_service_1.gradeService.getAllGrades();
        const roles = await role_service_1.roleService.getAllRoles();
        // USER
        const user1 = new User_1.User('Pablo', 'González', depByName(departments, 'Software'), gradeByName(grades, 'Director'), [roleByName(roles, 'Director de Software')], 'pgonzalez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        console.log('DEPARTAMENTO USER 1', JSON.stringify(user1.department));
        const user2 = new User_1.User('Laura', 'Martínez', depByName(departments, 'Software'), gradeByName(grades, 'Coordinador'), [roleByName(roles, 'Coordinador de Software')], 'lmartinez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user3 = new User_1.User('Carlos', 'López', depByName(departments, 'Software'), gradeByName(grades, 'Coordinador'), [roleByName(roles, 'Coordinador de Software')], 'clopez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user4 = new User_1.User('Ana', 'Ramírez', depByName(departments, 'Software'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Software')], 'aramirez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        console.log();
        const user5 = new User_1.User('Miguel', 'Hernández', depByName(departments, 'Software'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Software')], 'mhernandez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user6 = new User_1.User('Sofía', 'Torres', depByName(departments, 'Software'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Software')], 'storres@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user7 = new User_1.User('Andrés', 'Díaz', depByName(departments, 'Software'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Software')], 'adiaz@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user8 = new User_1.User('Lucía', 'García', depByName(departments, 'Software'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Software')], 'lgarcia@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user9 = new User_1.User('Jorge', 'Pérez', depByName(departments, 'Comercial'), gradeByName(grades, 'Director'), [roleByName(roles, 'Director Comercial')], 'jperez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user10 = new User_1.User('María', 'Fernández', depByName(departments, 'Comercial'), gradeByName(grades, 'Coordinador'), [roleByName(roles, 'Coordinador Comercial')], 'mfernandez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user11 = new User_1.User('Alberto', 'Ruiz', depByName(departments, 'Comercial'), gradeByName(grades, 'Coordinador'), [roleByName(roles, 'Coordinador Comercial')], 'aruiz@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user12 = new User_1.User('Elena', 'Morales', depByName(departments, 'Comercial'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico Comercial')], 'emorales@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user13 = new User_1.User('David', 'Vega', depByName(departments, 'Comercial'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico Comercial')], 'dvega@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user14 = new User_1.User('Patricia', 'Santos', depByName(departments, 'Comercial'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico Comercial')], 'psantos@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user15 = new User_1.User('Raúl', 'Castillo', depByName(departments, 'Comercial'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico Comercial')], 'rcastillo@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user16 = new User_1.User('Marta', 'Vázquez', depByName(departments, 'Comercial'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico Comercial')], 'mortega@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user17 = new User_1.User('Sergio', 'Giménez', depByName(departments, 'Marketing'), gradeByName(grades, 'Director'), [roleByName(roles, 'Director de Marketing')], 'sgimenez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user18 = new User_1.User('Cristina', 'Sánchez', depByName(departments, 'Marketing'), gradeByName(grades, 'Coordinador'), [roleByName(roles, 'Coordinador de Marketing')], 'csanchez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user19 = new User_1.User('Manuel', 'Núñez', depByName(departments, 'Marketing'), gradeByName(grades, 'Coordinador'), [roleByName(roles, 'Coordinador de Marketing')], 'mnunez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user20 = new User_1.User('Paula', 'Cruz', depByName(departments, 'Marketing'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Marketing')], 'pcruz@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user21 = new User_1.User('Francisco', 'Reyes', depByName(departments, 'Marketing'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Marketing')], 'freyes@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user22 = new User_1.User('Clara', 'Ibáñez', depByName(departments, 'Marketing'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Marketing')], 'cibanez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user23 = new User_1.User('Juan', 'Campos', depByName(departments, 'Marketing'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Marketing')], 'jcampos@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user24 = new User_1.User('Alejandra', 'Romero', depByName(departments, 'Marketing'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Marketing')], 'aromero@example.com', await bcrypt_1.default.hash('12345678a', 10));
        await user_repository_1.userRepo.save([
            user1, user2, user3, user4, user5, user6, user7, user8,
            user9, user10, user11, user12, user13, user14, user15, user16,
            user17, user18, user19, user20, user21, user22, user23, user24
        ]);
        console.log('Datos Usuarios introducidos');
        // ACCOUNT
        const defPriceConfig = await price_config_service_1.priceConfigService.getDefaultPriceConfig();
        const account1 = new Account_1.Account('Alimentación Robledo', 'arobledo@example.com', true, user4, user11, defPriceConfig);
        const account2 = new Account_1.Account('Innova Tech', 'innovatech@example.com', true, user1, user9, defPriceConfig);
        const account3 = new Account_1.Account('Servicios Alimentarios S.A.', 'serviciosalimentarios@example.com', true, user6, user10, defPriceConfig);
        const account4 = new Account_1.Account('Construcciones Álvarez', 'construccionesalvarez@example.com', false, user5, user12, defPriceConfig);
        const account5 = new Account_1.Account('Comercial García', 'comercialgarcia@example.com', false, user3, user13, defPriceConfig);
        const account6 = new Account_1.Account('Grupo Alimentario Fresco', 'grupoalimentariofresco@example.com', false, user2, user14, defPriceConfig);
        const account7 = new Account_1.Account('Oficina Central S.A.', 'oficinacentral@example.com', false, user7, user15, defPriceConfig);
        const account8 = new Account_1.Account('Ropa y Estilo', 'ropayestilo@example.com', false, user8, user16, defPriceConfig);
        const account9 = new Account_1.Account('Consultora Empresarial Global', 'consultoraempresarial@example.com', false, user4, user17, defPriceConfig);
        const account10 = new Account_1.Account('Salud y Bienestar S.L.', 'saludybienestar@example.com', false, user1, user18, defPriceConfig);
        // Guardar cuentas en el repositorio
        await account_repository_1.accountRepo.save([
            account1, account2, account3, account4, account5, account6, account7, account8, account9, account10
        ]);
        console.log('Datos Cuentas introducidos');
        // Typologies
        const typo1 = new Typology_1.Typology("Tienda Online");
        const typo2 = new Typology_1.Typology("Red social");
        const typo3 = new Typology_1.Typology("Software Empresarial");
        const typo4 = new Typology_1.Typology("Plataforma educativa");
        await typology_repository_1.typologyRepo.save([
            typo1, typo2, typo3, typo4
        ]);
        // Opportunities
        // Oportunidades para 'Alimentación Robledo'
        const opportunity1 = new Opportunity_1.Opportunity(account1, 'App Móvil de Recetas', ['Integración con redes sociales', 'Notificaciones push'], typo2, user10, user4);
        const opportunity2 = new Opportunity_1.Opportunity(account1, 'Sistema de Gestión de Pedidos', ['Interfaz de usuario amigable', 'Integración de pagos'], typo3, user10, user4);
        // Oportunidades para 'Innova Tech'
        const opportunity3 = new Opportunity_1.Opportunity(account2, 'Desarrollo de Plataforma de E-learning', ['Módulos de cursos', 'Sistema de gestión de usuarios'], typo4, user9, user1);
        const opportunity4 = new Opportunity_1.Opportunity(account2, 'Sistema de Gestión de Clientes (CRM)', ['Automatización de ventas', 'Análisis de datos'], typo3, user9, user1);
        // Oportunidades para 'Servicios Alimentarios S.A.'
        const opportunity5 = new Opportunity_1.Opportunity(account3, 'Plataforma de Venta de Alimentos', ['Catálogo de productos', 'Opciones de entrega'], typo1, user11, user6);
        const opportunity6 = new Opportunity_1.Opportunity(account3, 'Sistema de Gestión de Inventarios', ['Control de stock', 'Reportes de ventas'], typo3, user11, user6);
        // Guardar oportunidades en el repositorio
        await opportunity_repository_1.opportunityRepo.save([
            opportunity1, opportunity2, opportunity3,
            opportunity4, opportunity5, opportunity6
        ]);
        console.log('Datos Oportunidades introducidos');
    }
}
exports.MockSeeder = MockSeeder;
