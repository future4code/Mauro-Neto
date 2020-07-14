import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { AddressInfo } from 'net';
import { UserDatabase } from './data/UserDatabase';
import { IdGenerator } from './service/IdGenerator';
import { Authenticator } from './service/Authenticator';

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

const userDB = new UserDatabase;
const idGenerator = new IdGenerator;
const authenticator = new Authenticator;

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

        const id = idGenerator.generate()
        await userDB.createUser(id, req.body.email, req.body.password)
        const token = authenticator.generateToken({id});
        res.status(200).send({token});
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})

app.post("/login", async(req: Request, res: Response)=>{
    try {
        if(!req.body.email || req.body.email.indexOf("@") === -1){
            if(!req.body.email){
                throw new Error("Missing e-mail")
            }
            throw new Error("Invalid e-mail");
        }
        const user = await userDB.getUserByEmail(req.body.email)
        if(user.password !== req.body.password){
            throw new Error("Wrong password!")
        }
        const token = authenticator.generateToken({id: user.id})
        res.status(200).send({token});
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

app.get("/user/profile", async(req:Request, res: Response)=>{
    try {
        const authenticatorData = await authenticator.getData(req.headers.authorization as string)
        const id = authenticatorData.id;

        const user = await userDB.getUserById(id);

        res.status(200).send({id, email: user.email});
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})