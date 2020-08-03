import { BaseDatabase } from "./BaseDatabase"

export class TicketDatabase extends BaseDatabase{
    public async createTicket(show_id: string, ticket_type: string, value: number, tickets_quantity: number){
        try {
            await this.getConnection().insert({show_id, ticket_type, value, tickets_quantity}).into(process.env.TICKET_DB_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getAvailableTickets(show_id: string, ticket_type: string){
        try {
            const ticket = await this.getConnection().select('*').from(process.env.TICKET_DB_NAME).where({show_id}).andWhere({ticket_type})

            if(ticket.length>0){
                return ticket[0].tickets_quantity - ticket[0].tickets_sold
            }
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async buyTicket(show_id: string, ticket_type:string, quantity: number){
        try {
            await this.getConnection()
                .raw(`
                UPDATE Lama_Tickets 
                SET  tickets_sold = tickets_sold+${quantity} 
                WHERE show_id="${show_id}" 
                AND ticket_type="${ticket_type}"`
            )
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}