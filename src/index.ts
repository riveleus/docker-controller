import express from 'express';
import Docker from 'dockerode';
import cors from 'cors';

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

const app = express();

app.use(cors({ origin: "*" }))
app.use(express.json());

app.post('/restart', async (req, res) => {
    const { containerName } = req.body;

    try {
        const container = docker.getContainer(containerName);
        await container.restart();
        res.send(`Container "${containerName}" restarted.`);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Failed to restart container "${containerName}".`);
    }
});

app.listen(1000, () => {
    console.log('Docker Controller running on port 1000');
});