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
const express_1 = __importDefault(require("express"));
const UserDatabase_1 = require("./data/UserDatabase");
const IdGenerator_1 = require("./service/IdGenerator");
const Authenticator_1 = require("./service/Authenticator");
dotenv_1.default.config();
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
const userDB = new UserDatabase_1.UserDatabase;
const idGenerator = new IdGenerator_1.IdGenerator;
const authenticator = new Authenticator_1.Authenticator;
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || req.body.email.indexOf("@") === -1) {
            if (!req.body.email) {
                throw new Error("Missing e-mail");
            }
            throw new Error("Invalid e-mail");
        }
        if (!req.body.password || req.body.password.length < 6) {
            if (!req.body.password) {
                throw new Error("Missing password");
            }
            throw new Error("Password must have 6 or more digits");
        }
        const id = idGenerator.generate();
        yield userDB.createUser(id, req.body.email, req.body.password);
        const token = authenticator.generateToken({ id });
        res.status(200).send({ token });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || req.body.email.indexOf("@") === -1) {
            if (!req.body.email) {
                throw new Error("Missing e-mail");
            }
            throw new Error("Invalid e-mail");
        }
        const user = yield userDB.getUserByEmail(req.body.email);
        if (user.password !== req.body.password) {
            throw new Error("Wrong password!");
        }
        const token = authenticator.generateToken({ id: user.id });
        res.status(200).send({ token });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}));
app.get("/user/profile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authenticatorData = yield authenticator.getData(req.headers.authorization);
        const id = authenticatorData.id;
        const user = yield userDB.getUserById(id);
        res.status(200).send({ id, email: user.email });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}));
//# sourceMappingURL=index.js.map