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
exports.SettingsEntity = void 0;
const typeorm_1 = require("typeorm");
let SettingsEntity = class SettingsEntity {
};
exports.SettingsEntity = SettingsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'settings_id' }),
    __metadata("design:type", String)
], SettingsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SettingsEntity.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiration_estimation_days', default: 30 }),
    __metadata("design:type", Number)
], SettingsEntity.prototype, "expirationProposalDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_login_attempts', default: 5 }),
    __metadata("design:type", Number)
], SettingsEntity.prototype, "maxLoginAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'block_duration_minutes', default: 5 }),
    __metadata("design:type", Number)
], SettingsEntity.prototype, "blockDurationMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiration_reset_token_hours', default: 24 }),
    __metadata("design:type", Number)
], SettingsEntity.prototype, "expirationResetTokenHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiration_auth_token_hours', default: 5 }),
    __metadata("design:type", Number)
], SettingsEntity.prototype, "expirationAuthTokenHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'send_done_estimation_email', default: true }),
    __metadata("design:type", Boolean)
], SettingsEntity.prototype, "sendDoneEstimationEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'send_assigned_user_email', default: true }),
    __metadata("design:type", Boolean)
], SettingsEntity.prototype, "sendAssignedUserEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'send_user_finish_email', default: true }),
    __metadata("design:type", Boolean)
], SettingsEntity.prototype, "sendUserFinishedEmail", void 0);
exports.SettingsEntity = SettingsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'settings' })
], SettingsEntity);
