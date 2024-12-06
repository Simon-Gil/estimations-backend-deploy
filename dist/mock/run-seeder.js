"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = __importDefault(require("../config/database.config"));
const init_seeder_1 = __importDefault(require("./init.seeder"));
// Función para ejecutar los seeders de config inicial de la base de datos
async function runSeeders() {
    try {
        await database_config_1.default.initialize();
        console.log('Conexión a la base de datos establecida.');
        const initSeeder = new init_seeder_1.default();
        await initSeeder.run(database_config_1.default);
        console.log('Seeders ejecutados correctamente.');
    }
    catch (error) {
        console.error('Error al ejecutar los seeders:', error);
    }
    finally {
        // Cerrar la conexión a la base de datos
        await database_config_1.default.destroy();
    }
}
runSeeders();
