import knex from 'knex'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { AddressInfo } from "net";
import moment from 'moment'

dotenv.config()

const connection = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOSTNAME,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA
    },
});

const app = express()

app.use(express.json())

const server = app.listen(3000, ()=>{
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
})

const createUser = async(name: string, nickname: string, email: string): Promise<void> => {
    try{
        await connection.insert({name, nickname, email}).into("TodoListUser");
        console.log("Usuário criado com sucesso")
    }
    catch(error){
        console.log(error)
    }
}

app.post("/user", async(req: Request, res: Response)=>{
    try {
        await createUser(req.body.name, req.body.name, req.body.email)
        res.status(201).send({message: "User Created"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})


const getUserById = async(id: number): Promise<any> => {
    try {
        const user = await connection.select("*").from("TodoListUser").where("id", "=", id);
        return user[0];
    } catch (error) {
        console.log(error)
    }   
}

app.get("/user/:id", async(req: Request, res: Response) => {
    try {
        const user = await getUserById(Number(req.params.id));
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})

const createTask = async(title: string, description: string, limitDate: Date, creatorUserId: number): Promise<void>=>{
    try {
        await connection.insert({title, description, limit_date: limitDate, creator_user_id: creatorUserId}).into("TodoListTask");
        console.log("Tarefa criada")
    } catch (error) {
        console.log(error)
    }
}

app.put("/task", async(req:Request, res: Response)=>{
    try {
        await createTask(req.body.title, req.body.description, new Date(req.body.limitDate), Number(req.body.creatorUserId))
        res.status(201).send({message: "Tarefa criada"});
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})

const getTaskById = async(id: number): Promise<any> => {
    try {
        const task = await connection.select("TodoListTask.*", "TodoListUser.nickname").from("TodoListTask").where("TodoListTask.id", "=", id).join("TodoListUser", "TodoListUser.id", "=", "TodoListTask.creator_user_id");
        const formattedObject = {
            taskId: task[0].id,
            title: task[0].title,
            description: task[0].description,
            limitDate: moment(task[0].limit_date).format("DD/MM/YYYY"),
            status: task[0].status,
            creatorUserId: task[0].creator_user_id,
            creatorUserNickname: task[0].nickname
        }
        return formattedObject;
    } catch (error) {
        console.log(error);
    }
}

app.get("/task/:id", async(req: Request, res: Response) => {
    try {
        const task = await getTaskById(Number(req.params.id));
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})