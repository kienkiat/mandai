"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("./models/Product");
const User_1 = require("./models/User");
const Order_1 = require("./models/Order");
const OrderItem_1 = require("./models/OrderItem");
const Inventory_1 = require("./models/Inventory");
const postgresql_1 = require("@mikro-orm/postgresql");
exports.default = {
    dbName: 'products',
    driver: postgresql_1.PostgreSqlDriver,
    user: 'kienkiat',
    password: 'kienkiat',
    entities: [Product_1.Product, User_1.User, Order_1.Order, OrderItem_1.OrderItem, Inventory_1.Inventory],
    debug: true,
};
