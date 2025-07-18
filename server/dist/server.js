"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Ensure this logs the correct secret
const express_1 = __importDefault(require("express"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const core_1 = require("@mikro-orm/core");
const ormconfig_1 = __importDefault(require("./ormconfig"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware for parsing JSON requests
app.use('/api', productRoutes_1.default);
app.use('/api', authRoutes_1.default);
// Use async/await for proper error handling
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orm = yield core_1.MikroORM.init(ormconfig_1.default);
        app.listen(3000, () => {
            console.log('Backend running on http://localhost:3000');
        });
    }
    catch (error) {
        console.error('Error initializing MikroORM:', error);
    }
});
startServer();
