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
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
dotenv_1.default.config();
const connection = knex_1.default({
    client: "mysql",
    connection: {
        host: process.env.DB_HOSTNAME,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA
    },
});
const app = express_1.default();
app.use(express_1.default.json());
const server = app.listen(3000, () => {
    if (server) {
        const address = server.address();
        console.log(`Server is running in http://localhost:${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});
const createUser = (name, nickname, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection.insert({ name, nickname, email }).into("TodoListUser");
        console.log("Usuário criado com sucesso");
    }
    catch (error) {
        console.log(error);
    }
});
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createUser(req.body.name, req.body.name, req.body.email);
        res.status(201).send({ message: "User Created" });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}));
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield connection.select("*").from("TodoListUser").where("id", "=", id);
        return user[0];
    }
    catch (error) {
        console.log(error);
    }
});
app.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield getUserById(Number(req.params.id));
        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}));
const createTask = (title, description, limitDate, creatorUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection.insert({ title, description, limit_date: limitDate, creator_user_id: creatorUserId }).into("TodoListTask");
        console.log("Tarefa criada");
    }
    catch (error) {
        console.log(error);
    }
});
app.put("/task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createTask(req.body.title, req.body.description, new Date(req.body.limitDate), Number(req.body.creatorUserId));
        res.status(201).send({ message: "Tarefa criada" });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}));
const getTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield connection.select("TodoListTask.*", "TodoListUser.nickname").from("TodoListTask").where("TodoListTask.id", "=", id).join("TodoListUser", "TodoListUser.id", "=", "TodoListTask.creator_user_id");
        console.log(task[0].limit_date);
        const formattedObject = {
            taskId: task[0].id,
            title: task[0].title,
            description: task[0].description,
            limitDate: moment_1.default(task[0].limit_date).format("DD/MM/YYYY"),
            status: task[0].status,
            creatorUserId: task[0].creator_user_id,
            creatorUserNickname: task[0].nickname
        };
        return formattedObject;
    }
    catch (error) {
        console.log(error);
    }
});
app.get("/task/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield getTaskById(Number(req.params.id));
        res.status(200).send(task);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}));
//# sourceMappingURL=index.js.map