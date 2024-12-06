"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalEntity = void 0;
const typeorm_1 = require("typeorm");
const estimation_entity_1 = require("../estimations/estimation.entity");
const opportunity_entity_1 = require("../opportunity/opportunity.entity");
const ProposalStatus_1 = require("./ProposalStatus");
let ProposalEntity = class ProposalEntity {
};
exports.ProposalEntity = ProposalEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'proposal_id' }),
    __metadata("design:type", String)
], ProposalEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProposalEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tech_proposal' }),
    __metadata("design:type", String)
], ProposalEntity.prototype, "techProposal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'goal_and_context' }),
    __metadata("design:type", String)
], ProposalEntity.prototype, "goalAndContext", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estimated_months', nullable: true }),
    __metadata("design:type", Number)
], ProposalEntity.prototype, "estimatedMonths", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'exp_date', nullable: true }),
    __metadata("design:type", Date)
], ProposalEntity.prototype, "expDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total', nullable: true, type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], ProposalEntity.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProposalStatus_1.ProposalStatus,
        default: ProposalStatus_1.ProposalStatus.PENDING
    }),
    __metadata("design:type", String)
], ProposalEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => estimation_entity_1.EstimationEntity, estimation => estimation.proposal),
    __metadata("design:type", estimation_entity_1.EstimationEntity)
], ProposalEntity.prototype, "estimation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => opportunity_entity_1.OpportunityEntity, opportunity => opportunity.proposals, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'opportunity_id' }),
    __metadata("design:type", opportunity_entity_1.OpportunityEntity)
], ProposalEntity.prototype, "opportunity", void 0);
exports.ProposalEntity = ProposalEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'proposal' })
], ProposalEntity);
