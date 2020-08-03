import express from 'express'
import dotenv from 'dotenv'
import { AddressInfo } from 'net';
import { routes } from './routes';

dotenv.config()

const app = express();

app.use(express.json())

const cors = require('cors')

app.use(cors())

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method"
    );
    if (req.method === "OPTIONS") {
    return res.status(200).end();
    }
    next();
});

app.use(routes)

const server = app.listen(3300, ()=>{
    if(server){
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`);
    }
    else{
        console.error(`Failure upon starting server.`);
    }
})