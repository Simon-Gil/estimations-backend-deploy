"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.opportunityRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("./../../config/database.config"));
const opportunity_entity_1 = require("./../opportunity/opportunity.entity");
class OpportunityRepository extends typeorm_1.Repository {
    constructor() {
        super(opportunity_entity_1.OpportunityEntity, database_config_1.default.createEntityManager());
    }
}
exports.opportunityRepo = new OpportunityRepository();
