import knex from 'knex'
import dotenv from 'dotenv'
import express from 'express'

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

getSalaryAverageByGender("male")