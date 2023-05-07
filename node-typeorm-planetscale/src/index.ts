import "reflect-metadata";
import express from "express";
import http from "http";
import {
    createTask,
    deleteTask,
    retrieveAllTasks,
    retrieveTask,
    updateTask
} from "./controllers/task.controller";
import { AppDataSource } from "./data-source";

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
router.get('/', (req, res) => { res.json({ message: "hello" }); });

const server = http.createServer(app);

server.listen(SERVER_PORT, async () => {
    // Connect to database
    try {
        await AppDataSource.initialize();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.info(`Server started at http://127.0.0.1/${SERVER_PORT}`);
});
