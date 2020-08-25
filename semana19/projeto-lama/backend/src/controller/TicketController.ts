import {Request, Response} from 'express'
import { TicketBusiness } from "../business/TicketBusiness";
import { createTicketDTO, buyTicketDTO } from '../model/Ticket';
import { Authenticator } from '../service/Authenticator';
import { TicketDatabase } from '../data/TicketDatabase';
import { BaseDatabase } from '../data/BaseDatabase';

export class TicketController{
    private static TicketBusiness = new TicketBusiness(new Authenticator, new TicketDatabase)

    public async createTicket(req: Request, res: Response){
        try {
            const input: createTicketDTO = {
                show_id: req.body.show_id,
                ticket_type: req.body.ticket_type,
                value: Number(req.body.value),
                tickets_quantity: Number(req.body.tickets_quantity)
            }

            await TicketController.TicketBusiness.createTicket(req.headers.authorization, input)

            res.sendStatus(200)
        } catch (error) {
            res.status(error.code || 400).send(error.message)
        }
        await BaseDatabase.destroyConnnection();
    }

    public async buyTicket(req: Request, res: Response){
        try {
            const input: buyTicketDTO = {
                show_id: req.body.show_id,
                ticket_type: req.body.ticket_type,
                quantity: Number(req.body.quantity)
            }

            await TicketController.TicketBusiness.buyTicket(req.headers.authorization, input)

            res.sendStatus(200);
        } catch (error) {
            res.status(error.code || 400).send(error.message)
        }
        await BaseDatabase.destroyConnnection();
    }
}