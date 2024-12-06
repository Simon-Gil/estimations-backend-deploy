"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("./../../config/database.config"));
const account_entity_1 = require("./account.entity");
class AccountRepository extends typeorm_1.Repository {
    constructor() {
        super(account_entity_1.AccountEntity, database_config_1.default.createEntityManager());
    }
}
exports.accountRepo = new AccountRepository;
