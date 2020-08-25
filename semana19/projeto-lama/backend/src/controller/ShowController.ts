import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { CreateShowDTO } from "../model/Show";
import { ShowDatabase } from "../data/ShowDatabase";
import { Authenticator } from "../service/Authenticator";
import { IdGenerator } from "../service/IdGenerator";
import { BaseDatabase } from "../data/BaseDatabase";

export class ShowController{
    private static ShowBusiness = new ShowBusiness(new ShowDatabase, new Authenticator, new IdGenerator);

    public async createShow(req: Request, res: Response){
        try {
            const input: CreateShowDTO = {
                week_day: req.body.week_day,
                start_time: Number(req.body.start_time),
                end_time: Number(req.body.end_time),
                band_id: req.body.band_id
            }

            await ShowController.ShowBusiness.createShow(req.headers.authorization, input)
            res.sendStatus(200);
        } catch (error) {
            res.status(error.code || 400).send({error: error.message})
        }
        await BaseDatabase.destroyConnnection();
    }

    public async getShowsByDay(req: Request, res: Response){
        try {
            const shows = await ShowController.ShowBusiness.getShowsByDay(req.headers.authorization, req.query.week_day as string)

            res.status(200).send({shows})
        } catch (error) {
            res.status(error.code || 400).send({error: error.message})
        }
        await BaseDatabase.destroyConnnection();
    }
}