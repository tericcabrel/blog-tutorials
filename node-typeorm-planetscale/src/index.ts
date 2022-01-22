import "reflect-metadata";
import express from "express";
import http from "http";
import { createConnection } from "typeorm";
import {
    createTask,
    deleteTask,
    retrieveAllTasks,
    retrieveTask,
    updateTask
} from "./controller/task.controller";

const SERVER_PORT = 8100;

const app = express();
const router = express.Router();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.post('/tasks', createTask);
router.patch('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.get('/tasks/:id', retrieveTask);
router.get('/tasks', retrieveAllTasks);

app.use('/', router);

const server = http.createServer(app);

server.listen(SERVER_PORT, async () => {
    // Connect to database
    try {
        await createConnection();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.info(`Server started at the port ${SERVER_PORT}`);
});