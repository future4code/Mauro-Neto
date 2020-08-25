import { Request, Response } from "express";
import { PhotoBusiness } from "../business/PhotoBusiness";
import { AddPhotoDTO } from "../model/Photo";
import { Authenticator } from "../service/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { PhotoDatabase } from "../data/PhotoDatabase";
import { ShowDatabase } from "../data/ShowDatabase";

export class PhotoController{
    private static PhotoBusiness = new PhotoBusiness(new Authenticator, new PhotoDatabase, new ShowDatabase);

    public async addPhoto(req: Request, res: Response){
        try {
            const input: AddPhotoDTO = {
                show_id: req.body.show_id,
                photo: req.body.photo
            }

            await PhotoController.PhotoBusiness.addPhoto(req.headers.authorization, input)
            
            res.sendStatus(200)
        } catch (error) {
            res.status(error.code || 400).send(error.message)
        }
        await BaseDatabase.destroyConnnection();
    }

    public async getPhotosFromShow(req: Request, res: Response){
        try {
            const photos = await PhotoController.PhotoBusiness.getPhotosFromShow(req.headers.authorization, req.params.show_id)

            res.status(200).send({photos})
        } catch (error) {
            res.status(error.code || 400).send(error.message)
        }
        await BaseDatabase.destroyConnnection();
    }
}