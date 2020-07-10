import knex from 'knex'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { AddressInfo } from "net";
import moment from 'moment'
import { format } from 'path';
import { ResolveOptions } from 'dns';

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

const getUserById = async(id: number): Promise<any> => {
    try {
        const user = await connection.select("*").from("TodoListUser").where("id", "=", id);
        return user[0];
    } catch (error) {
        console.log(error)
    }   
}

const editUser = async(id: number, name?: string, nickname?: string): Promise<any> => {
    try {
        if(name && !nickname){
            await connection("TodoListUser").update({name}).where("id", "=", id)
            return {name}
        }
        else if(!name && nickname){
            await connection("TodoListUser").update({nickname}).where("id", "=", id)
            return {nickname}
        }
        else if(name && nickname){
            await connection("TodoListUser").update({name, nickname}).where("id", "=", id)
            return {name, nickname}
        }
    } catch (error) {
        console.log(error)
    }
}

const createTask = async(title: string, description: string, limitDate: Date, creatorUserId: number): Promise<void>=>{
    try {
        await connection.insert({title, description, limit_date: limitDate, creator_user_id: creatorUserId}).into("TodoListTask");
        console.log("Tarefa criada")
    } catch (error) {
        console.log(error)
    }
}

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

const getAllUsers = async(): Promise<any> => {
    try{
        const users = await connection.select("*").from("TodoListUser")
        return users;
    }
    catch(error){
        console.log(error);
    }
}

const getAllTasksByUserId = async(id: number):Promise<any> => {
    try {
        const tasks = await connection.select("TodoListTask.*", "TodoListUser.nickname").from("TodoListTask").where("creator_user_id", "=", id).join("TodoListUser", "TodoListUser.id", "=", "TodoListTask.creator_user_id");
        const formattedTasks = tasks.map(task=>{
            return {
                taskId: task.id,
                title: task.title,
                description: task.description,
                limitDate: moment(task.limit_date).format("DD/MM/YYYY"),
                creatorUserId: task.creator_user_id,
                status: task.status,
                creatorUserNickname: task.nickname
            }
        })
        return formattedTasks;
    } catch (error) {
        console.log(error);
    }
}

app.get("/user/all", async(req: Request, res: Response)=>{
    try {
        const users = await getAllUsers();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})

app.get("/user/:id", async(req: Request, res: Response) => {
    try {
        const user = await getUserById(Number(req.params.id));
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})

app.post("/user", async(req: Request, res: Response)=>{
    try {
        await createUser(req.body.name, req.body.name, req.body.email)
        res.status(201).send({message: "User Created"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

app.post("/user/:id", async(req: Request, res: Response)=>{
    try {
        console.log(req.body)
        if(req.body.name && !req.body.nickname){
            res.status(200).send(await editUser(Number(req.params.id), req.body.name))
        }
        else if(!req.body.name && req.body.nickname){
            res.status(200).send(await editUser(Number(req.params.id), null,req.body.nickname))
        }
        else if(req.body.name && req.body.nickname){
            res.status(200).send(await editUser(Number(req.params.id), req.body.name, req.body.nickname))
        }
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

app.get("/task", async(req: Request, res: Response)=>{
    try {
        const tasks = await getAllTasksByUserId(Number(req.query.creatorUserId))
        res.status(200).send({tasks})
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})

app.get("/task/:id", async(req: Request, res: Response) => {
    try {
        const task = await getTaskById(Number(req.params.id));
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})

app.put("/task", async(req:Request, res: Response)=>{
    try {
        await createTask(req.body.title, req.body.description, new Date(req.body.limitDate), Number(req.body.creatorUserId))
        res.status(201).send({message: "Tarefa criada"});
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})