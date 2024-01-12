"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UsersSchema = new mongoose_1.default.Schema({
    employeeId: String,
    password: String
});
const Users = mongoose_1.default.models.Users || mongoose_1.default.model("Journey", UsersSchema);
exports.default = Users;
//# sourceMappingURL=users.js.map