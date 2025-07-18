"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);
const express_1 = __importDefault(require("express"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const core_1 = require("@mikro-orm/core");
const ormconfig_1 = __importDefault(require("./ormconfig"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware for parsing JSON requests
app.use('/api', productRoutes_1.default);
app.use('/api', authRoutes_1.default);
core_1.MikroORM.init(ormconfig_1.default).then(() => {
    app.listen(3000, () => {
        console.log('Backend running on http://localhost:3000');
    });
});
