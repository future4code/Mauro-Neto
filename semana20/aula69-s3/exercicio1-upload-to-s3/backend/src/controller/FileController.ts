import {Request, Response} from 'express'
import { S3Service } from '../services/S3Service'

export class FileController{
    public async uploadFile(req: Request, res: Response){
        try {
            const file = req.files && (req.files.file as any)

            if(!file){
                throw new Error('You must send a file')
            }

            const s3Service = new S3Service();

            const result = await s3Service.uploadFile({
                name: file.name,
                file: file.data
            })

            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }
}