import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { AddressInfo } from 'net';
import {UserDatabase} from './data/UserDatabase';
import { IdGenerator } from './service/IdGenerator';
import { Authenticator } from './service/Authenticator';
import {HashManager} from './service/HashManager'
import { Hash } from 'crypto';
import { BaseDatabase } from './service/BaseDatabase';

dotenv.config();

const app = express();

app.use(express.json());

const server = app.listen(3000, ()=>{
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
})

app.post("/signup", async(req: Request, res: Response)=>{
    try {
        if(!req.body.email || req.body.email.indexOf("@") === -1){
            if(!req.body.email){
                throw new Error("Missing e-mail")
            }
            throw new Error("Invalid e-mail");
        }

        if(!req.body.password || req.body.password.length < 6){
            if(!req.body.password){
                throw new Error("Missing password")
            }
            throw new Error("Password must have 6 or more digits");
        }

        const userDB = new UserDatabase;
        const idGenerator = new IdGenerator;
        const authenticator = new Authenticator;
        const hashManager = new HashManager;

        const id = idGenerator.generate()
        const password = await hashManager.hash(req.body.password);

        await userDB.createUser(id, req.body.email, password, req.body.role)
        const token = authenticator.generateToken({id, role: req.body.role});

        res.status(200).send({token});
    } catch (error) {
        res.status(400).send({message: error.message});
    }

    await BaseDatabase.destroyConnection();
})

app.post("/login", async(req: Request, res: Response)=>{
    try {
        if(!req.body.email || req.body.email.indexOf("@") === -1){
            if(!req.body.email){
                throw new Error("Missing e-mail")
            }
            throw new Error("Invalid e-mail");
        }

        const userDB = new UserDatabase;
        const authenticator = new Authenticator;
        const hashManager = new HashManager;

        const user = await userDB.getUserByEmail(req.body.email)

        const passwordCompare = await hashManager.compare(req.body.password, user.password)

        if(!passwordCompare){
            throw new Error("Wrong password!")
        }
        const token = authenticator.generateToken({id: user.id, role: user.role})
        res.status(200).send({token});
    } catch (error) {
        res.status(400).send({message: error.message})
    }

    await BaseDatabase.destroyConnection();
})

app.get("/user/profile", async(req:Request, res: Response)=>{
    try {
        const userDB = new UserDatabase;
        const authenticator = new Authenticator;

        const authenticatorData = await authenticator.getData(req.headers.authorization as string)
        if(authenticatorData.role !== "normal"){
            res.status(403).send({message: "Unauthorized"})
        }
        
        const id = authenticatorData.id;

        const user = await userDB.getUserById(id);

        res.status(200).send({id, email: user.email});
    } catch (error) {
        res.status(400).send({message: error.message})
    }

    await BaseDatabase.destroyConnection();
})

app.get("/user/:id", async(req:Request, res: Response)=>{
    try {
        const authenticator = new Authenticator;
        authenticator.getData(req.headers.authorization)

        const userDB = new UserDatabase;
        const user = await userDB.getUserById(req.params.id)

        res.status(200).send({id: user.id, email: user.email, role: user.role})
    } catch (error) {
        res.status(400).send({message: error.message})
    }

    await BaseDatabase.destroyConnection();
})

app.delete("/user/:id", async(req: Request, res: Response)=>{
    try {
        const authenticator = new Authenticator;
        
        const authenticatorData = await authenticator.getData(req.headers.authorization)
        if(authenticatorData.role !== "admin"){
            res.status(403).send({message: "Unauthorized"})
        }
        
        const userDB = new UserDatabase;
        await userDB.deleteUser(req.params.id)

        res.status(200).send({message: "User deleted"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }

    await BaseDatabase.destroyConnection();
})