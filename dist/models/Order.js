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
exports.Order = void 0;
const core_1 = require("@mikro-orm/core");
const User_1 = require("./User");
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Order.prototype, "orderDate", void 0);
__decorate([
    (0, core_1.Property)({ default: 1 }),
    __metadata("design:type", Number)
], Order.prototype, "status", void 0);
exports.Order = Order = __decorate([
    (0, core_1.Entity)()
], Order);
