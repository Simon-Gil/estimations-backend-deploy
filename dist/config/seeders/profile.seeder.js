"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSeeder = void 0;
const profile_entity_1 = require("../../modules/company-structure/profile/profile.entity");
const Profile_1 = require("../../modules/company-structure/profile/Profile");
// Seeder para Niveles
class ProfileSeeder {
    async run(dataSource, factoryManager) {
        const repository = dataSource.getRepository(profile_entity_1.ProfileEntity);
        const direccion = new Profile_1.Profile('Dirección');
        const front = new Profile_1.Profile('Front');
        const back = new Profile_1.Profile('Back');
        const research = new Profile_1.Profile('Research');
        const interfaces = new Profile_1.Profile('Interfaces');
        await repository.save([
            direccion, front, back, research, interfaces
        ]);
        console.log('Datos seed introducidos');
    }
}
exports.ProfileSeeder = ProfileSeeder;