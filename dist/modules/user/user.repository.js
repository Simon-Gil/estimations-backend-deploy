"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const database_config_1 = __importDefault(require("./../../config/database.config"));
class UserRepository extends typeorm_1.Repository {
    constructor() {
        super(user_entity_1.UserEntity, database_config_1.default.createEntityManager());
    }
}
exports.userRepo = new UserRepository();
