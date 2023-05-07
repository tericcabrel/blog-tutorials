import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./entity/Task";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3308,
    username: "root",
    password: "",
    database: "task-manager-db",
    synchronize: true,
    logging: false,
    entities: [Task],
    migrations: [
        "src/migration/**/*.ts"
    ],
    subscribers: [],
});
