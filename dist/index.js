"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cluster_1 = __importDefault(require("node:cluster"));
const node_os_1 = require("node:os");
const node_process_1 = __importDefault(require("node:process"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware");
const numCPUs = (0, node_os_1.availableParallelism)();
if (node_cluster_1.default.isPrimary) {
    console.log(`Primary ${node_process_1.default.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        node_cluster_1.default.fork();
    }
    node_cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        node_cluster_1.default.fork();
    });
}
else {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(express_1.default.static('public'));
    app.use(middleware_1.middleWare);
    app.listen(3000);
    console.log(`Worker ${node_process_1.default.pid} started`);
}
