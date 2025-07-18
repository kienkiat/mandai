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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.createProduct = void 0;
const Product_1 = require("../models/Product");
const core_1 = require("@mikro-orm/core");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, status } = req.body;
    const orm = yield core_1.MikroORM.init();
    const product = orm.em.create(Product_1.Product, { name, description, price, status });
    yield orm.em.persistAndFlush(product);
    res.status(201).json(product);
});
exports.createProduct = createProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init();
    const products = yield orm.em.find(Product_1.Product, {});
    res.status(200).json(products);
});
exports.getAllProducts = getAllProducts;
