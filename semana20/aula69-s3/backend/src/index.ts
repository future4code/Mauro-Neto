import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import { FileController } from './controller/FileController';
import { AddressInfo } from 'net';

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())
app.use(fileUpload())

const fileController = new FileController();

app.put("/file/upload", fileController.uploadFile)

const server = app.listen(3300, ()=>{
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});