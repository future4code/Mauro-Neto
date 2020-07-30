import { Response, Request } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { RegisterBandDTO, Band } from "../model/Band";
import { BandBusiness } from "../business/BandBusiness";
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../service/IdGenerator";
import { Authenticator } from "../service/Authenticator";

export class BandController{
    public static BandBusiness = new BandBusiness(new BandDatabase, new Authenticator,new IdGenerator);

    public async registerBand(req: Request, res: Response){
        try {
            const input: RegisterBandDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible
            }

            await BandController.BandBusiness.registerBand(req.headers.authorization, input)

            res.sendStatus(200);
        } catch (error) {
            res.status(error.code || 400).send({error: error.message});
        }
        await BaseDatabase.destroyConnnection();
    }

    public async viewBandDetails(req: Request, res: Response){
        try {
            const band = await BandController.BandBusiness.viewBandDetails(req.query.term as string)

            res.status(200).send({band})
        } catch (error) {
            res.status(error.code || 400).send({error: error.message})
        }

        await BaseDatabase.destroyConnnection()
    }

}