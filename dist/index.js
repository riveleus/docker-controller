"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dockerode_1 = __importDefault(require("dockerode"));
const cors_1 = __importDefault(require("cors"));
const docker = new dockerode_1.default({ socketPath: '/var/run/docker.sock' });
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.post('/restart', async (req, res) => {
    const { containerName } = req.body;
    try {
        const container = docker.getContainer(containerName);
        await container.restart();
        res.send(`Container "${containerName}" restarted.`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Failed to restart container "${containerName}".`);
    }
});
app.listen(1000, () => {
    console.log('Docker Controller running on port 1000');
});
