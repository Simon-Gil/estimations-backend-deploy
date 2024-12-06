"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proposalRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../config/database.config"));
const proposal_entity_1 = require("./proposal.entity");
class ProposalRepository extends typeorm_1.Repository {
    constructor() {
        super(proposal_entity_1.ProposalEntity, database_config_1.default.createEntityManager());
    }
    async findRelatedToUser(user) {
        const proposals = await exports.proposalRepo.find({
            where: [
                {
                    estimation: {
                        estimationUsers: {
                            user: {
                                id: user.id
                            }
                        }
                    }
                },
                {
                    opportunity: {
                        technicalManager: {
                            id: user.id
                        }
                    }
                },
                {
                    opportunity: {
                        commercialManager: {
                            id: user.id
                        }
                    }
                }
            ],
            relations: [
                'estimation.estimationUsers.user',
                'opportunity.technicalManager',
                'opportunity.commercialManager'
            ]
        });
        return proposals;
    }
}
exports.proposalRepo = new ProposalRepository();
