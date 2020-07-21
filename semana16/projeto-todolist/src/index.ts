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
        throw new Error(error.sqlMessage);
    }
}

const getUserById = async(id: number): Promise<any> => {
    try {
        const user = await connection.select("*").from("TodoListUser").where("id", "=", id);
        return user[0];
    } catch (error) {
        throw new Error(error.sqlMessage);
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
        throw new Error(error.sqlMessage);
    }
}

const createTask = async(title: string, description: string, limitDate: string, creatorUserId: number): Promise<void>=>{
    try {
        await connection.insert({title, description, limit_date: limitDate, creator_user_id: creatorUserId}).into("TodoListTask");
        console.log("Tarefa criada")
    } catch (error) {
        throw new Error(error.sqlMessage);
    }
}

const getTaskById = async(id: number): Promise<any> => {
    try {
        const task = await connection.select("TodoListTask.*", "TodoListUser.nickname").from("TodoListTask").where("TodoListTask.id", "=", id).join("TodoListUser", "TodoListUser.id", "=", "TodoListTask.creator_user_id");
        const responsibleUsers = await connection.select("TodoListUser.id", "TodoListUser.nickname").where("TodoListResponsibleUserTaskRelation.task_id", "=", id).from("TodoListUser").join("TodoListResponsibleUserTaskRelation", "TodoListUser.id", "=", "TodoListResponsibleUserTaskRelation.responsible_user_id")
        const formattedObject = {
            taskId: task[0].id,
            title: task[0].title,
            description: task[0].description,
            limitDate: moment(task[0].limit_date).format("DD/MM/YYYY"),
            status: task[0].status,
            creatorUserId: task[0].creator_user_id,
            creatorUserNickname: task[0].nickname,
            responsibleUsers
        }
        return formattedObject;
    } catch (error) {
        throw new Error(error.sqlMessage);
    }
}

const getAllUsers = async(): Promise<any> => {
    try{
        const users = await connection.select("*").from("TodoListUser")
        return users;
    }
    catch(error){
        throw new Error(error.sqlMessage);
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
        throw new Error(error.sqlMessage);
    }
}

const searchUser = async(query: string):Promise<any>=>{
    try {
        const users = await connection.select("id", "nickname").from("TodoListUser").where("nickname", "like", `%${query}%`).orWhere("email", "like", `${query}`);
        return users;
    } catch (error) {
        throw new Error(error.sqlMessage);
    }
}

const assignTaskToUser = async(task_id: number, responsible_user_id: number): Promise<void> =>{
    try {
        await connection.insert(({task_id, responsible_user_id})).into("TodoListResponsibleUserTaskRelation")
    } catch (error) {
        throw new Error(error.sqlMessage);
    }
}

const getResponsibleUsersForTask = async(id:number): Promise<any> => {
    try {
        const users = await connection.select("TodoListUser.id", "TodoListUser.nickname").where("TodoListResponsibleUserTaskRelation.task_id", "=", id).from("TodoListUser").join("TodoListResponsibleUserTaskRelation", "TodoListUser.id", "=", "TodoListResponsibleUserTaskRelation.responsible_user_id")
        return users;
    } catch (error) {
        throw new Error(error.sqlMessage);
    }
}

app.get("/user/all", async(req: Request, res: Response)=>{
    try {
        const users = await getAllUsers();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
})

app.get("/user/:id", async(req: Request, res: Response) => {
    try {
        if(!req.params.id){
            return res.status(400).send({message: "Please send an id to get an user"});
        }
        const user = await getUserById(Number(req.params.id));
        if(user){
            return res.status(200).send(user);
        }
        return res.status(400).send({message: `Can't find user with id ${req.params.id}`});
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
})

app.put("/user", async(req: Request, res: Response)=>{
    try {
        if(!req.body.name || !req.body.nickname || !req.body.email){
            return res.status(400).send({message: "Missing parameters, please fill all the fields"})
        }
        await createUser(req.body.name, req.body.nickname, req.body.email)
        return res.status(201).send({message: "User Created"})
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
})

app.get("/user", async(req: Request, res: Response)=>{
    try {
        if(!req.query.query){
            return res.status(400).send({message: "Missing query for search"})
        }
        const users = await searchUser(req.query.query as string);
        if(users.length>0){
            return res.status(200).send({users});
        }
        return res.status(200).send([]);
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
})

app.post("/user/:id", async(req: Request, res: Response)=>{
    try {
        if(!req.params.id){
            return res.status(400).send({message: "Please send an id to edit an user"});
        }
        if(req.body.name && !req.body.nickname && req.body.nickname!==""){
            return res.status(200).send(await editUser(Number(req.params.id), req.body.name))
        }
        else if(!req.body.name && req.body.name!=="" && req.body.nickname){
            return res.status(200).send(await editUser(Number(req.params.id), null,req.body.nickname))
        }
        else if(req.body.name && req.body.name!=="" && req.body.nickname && req.body.nickname !==""){
            return res.status(200).send(await editUser(Number(req.params.id), req.body.name, req.body.nickname))
        }
        else if(req.body.name==="" || req.body.nickname===""){
            return res.status(400).send({message: "You can't send an empty value"});
        }
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
})

app.get("/task", async(req: Request, res: Response)=>{
    try {
        if(!req.query.creatorUserId){
            return res.status(400).send({message: "Please send an id to get user's tasks"});
        }
        const tasks = await getAllTasksByUserId(Number(req.query.creatorUserId))
        if(tasks.length>0){
            return res.status(200).send({tasks})
        }
        return res.status(200).send([]);
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
})

app.get("/task/:id", async(req: Request, res: Response) => {
    try {
        if(!req.params.id){
            return res.status(400).send({message: "Please send an id to get a task"});
        }
        const task = await getTaskById(Number(req.params.id));
        if(task){
            return res.status(200).send(task);
        }
        return res.status(400).send({message: `Can't find task with id ${req.params.id}`});
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
})

app.get("/task/:id/responsible", async(req: Request, res: Response)=>{
    try {
        if(!req.params.id){
            return res.status(400).send({message: "Please send an id to get the responsible users for a task"});
        }
        const users = await getResponsibleUsersForTask(Number(req.params.id))
        if(users.length>0){
            return res.status(200).send(users)
        }
        return res.status(400).send({message: "Can't find responsible users for task"})
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
})

app.put("/task", async(req: Request, res: Response)=>{
    try {
        if(!req.body.title || !req.body.description || !req.body.limitDate || !req.body.creatorUserId){
            return res.status(400).send({message: "Missing parameters, please fill all the fields"})
        }
        await createTask(req.body.title, req.body.description, moment(req.body.limitDate, "DD/MM/YYYY").format("YYYY-MM-DD"), Number(req.body.creatorUserId))
        return res.status(201).send({message: "Task created"});
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
})

app.post("/task/responsible", async(req: Request, res: Response) => {
    try {
        if(!req.body.task_id || !req.body.responsible_user_id){
            res.status(400).send({message: "Missing parameters, please fill all the fields"})
        }
        await assignTaskToUser(req.body.task_id, req.body.responsible_user_id)
        res.status(200).send({message: "Task assigned successfully"})
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})