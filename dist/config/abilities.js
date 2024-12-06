"use strict";
// Configuración CASL
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAbilitiesFor = defineAbilitiesFor;
const ability_1 = require("@casl/ability");
async function defineAbilitiesFor(user) {
    const roles = user.roles;
    return (0, ability_1.defineAbility)((can, cannot) => {
        roles.forEach(role => {
            const permissions = role.permissions;
            permissions.forEach(permission => {
                can(permission.action, permission.subject);
            });
        });
    });
}
