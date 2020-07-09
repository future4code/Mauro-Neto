import knex from 'knex'
import dotenv from 'dotenv'
import express, { Request, Response } from "express";
import { AddressInfo } from "net";
import { create } from 'domain';

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

const app = express();

app.use(express.json())

const server = app.listen(3000, ()=>{
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
})


const searchActor = async (name: string): Promise<any> => {
    try{
        const result = await connection.raw(`
            SELECT * FROM Actor WHERE name LIKE "${name}"
        `)
        console.log(result[0][0])
        return result[0][0]
    }
    catch(error){
        console.log(error);
    }
}

const countByGender = async(gender: string): Promise<any> =>{
    try{
        const result = await connection.raw(`
            SELECT COUNT(*) AS count FROM Actor WHERE gender="${gender}"
        `)
        console.log(result[0][0]);

        return result[0][0];
    }
    catch(error){
        console.log(error);
    }
}

// searchActor("%o%")

// countByGender("male");

const updateSalaryById = async(id:string, salary: number): Promise<void> => {
    try {
        await connection("Actor").update({salary}).where("id", id);
        console.log("Atualizou")
    } catch (error) {
        console.log(error);
    }
}

// updateSalaryById("001", 500000);

const deleteActorById = async(id: string): Promise<void> => {
    try {
        await connection("Actor").delete().where("id", id);
        console.log("Ator deletado")
    } catch (error) {
        console.log(error);
    }
}

// deleteActorById("006");

const getSalaryAverageByGender = async(gender: string): Promise<any> => {
    try {
        const response = await connection("Actor").avg("salary").where("gender", gender);

        console.log(response[0])

    } catch (error) {
        console.log(error);
    }
}

// getSalaryAverageByGender("male");

app.get("/actor", async(req: Request, res: Response)=>{
    try{
        const count = await countByGender(req.query.gender as string)
        res.status(200).send(count);
    }
    catch(error){
        res.status(400).send({message: error.message});
    }
})

app.post("/actor", async(req: Request, res: Response)=>{
    try {
        await updateSalaryById(req.body.id, req.body.salary);
        res.status(200).send({message: "Success"})
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})

app.delete("/actor/:id", async(req: Request, res: Response)=>{
    try {
        await deleteActorById(req.params.id);
        res.status(200).send({message: `Actor with id ${req.params.id} deleted`})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

const createMovie = async(id: string, name: string, synopsis: string, release_Date: Date, rating: number, playing_limit_date: Date): Promise<void> =>{
    try{
        await connection.insert({id, name, synopsis, release_Date, rating, playing_limit_date}).into("Movie");
        console.log("Filme criado");
    }
    catch(error){
        console.log(error)
    }
}

app.post("/movie", async(req: Request, res: Response)=>{
    try {
        await createMovie(req.body.id, req.body.name, req.body.synopsis, new Date(req.body.release_Date), req.body.rating, new Date(req.body.playing_limit_date))
        res.status(201).send({message: "Movie created"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})