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
exports.UserDatabase = void 0;
const knex_1 = __importDefault(require("knex"));
class UserDatabase {
    constructor() {
        this.connection = knex_1.default({
            client: "mysql",
            connection: {
                host: process.env.DB_HOST,
                port: 3306,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            },
        });
        this.TABLE_NAME = "User";
    }
    createUser(id, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection.insert({ id, email, password }).into(this.TABLE_NAME);
            }
            catch (error) {
                throw new Error(error.sqlMessage);
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.connection.select('*').from(this.TABLE_NAME).where("email", "=", email);
                return user[0];
            }
            catch (error) {
                throw new Error(error.sqlMessage);
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.connection.select('*').from(this.TABLE_NAME).where("id", "=", id);
                return user[0];
            }
            catch (error) {
                throw new Error(error.sqlMessage);
            }
        });
    }
}
exports.UserDatabase = UserDatabase;
//# sourceMappingURL=UserDatabase.js.map