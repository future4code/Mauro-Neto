import dotenv from 'dotenv'
import express from 'express'
import { AddressInfo } from 'net';
import {routes} from './routes'
import cors from 'cors'
import 'mysql'

if(process.env.NODE_ENV !== "serverless"){
    dotenv.config()
}

const app = express();

app.use(cors({origin: true}))

app.use(express.json());

app.use(routes);

export default app;

if(process.env.NODE_ENV !== "serverless"){
    const server = app.listen(3000, ()=>{
        if (server) {
            const address = server.address() as AddressInfo;
            console.log(`Server is running in http://localhost:${address.port}`);
        } else {
            console.error(`Failure upon starting server.`);
        }
    });
}